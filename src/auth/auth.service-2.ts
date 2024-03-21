// auth.service.ts
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { HmacSHA512 } from 'crypto-js';
import { compareSync } from 'bcryptjs';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private dynamoDb: DynamoDBDocumentClient;
  private NODE_ENV: string;
  private readonly PWSALT: string = 'RS<X8yGzAbByVIT1WOqFz/{O$wjWeb';

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const dynamoDBClient = new DynamoDBClient({ region: 'us-east-1' });
    this.dynamoDb = DynamoDBDocumentClient.from(dynamoDBClient);
    this.NODE_ENV = this.configService.get('NODE_ENV') || 'local';
  }

  async login(
    username: string,
    password: string,
    dbSchema: string,
    uid?: string,
  ): Promise<any> {
    const user = await this.findUserByUsername(username, dbSchema);

    if (
      !uid &&
      (this.NODE_ENV === 'local' ||
        this.NODE_ENV === 'dev' ||
        this.NODE_ENV === 'staging')
    ) {
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const hmacPass = HmacSHA512(password, this.PWSALT).toString();
      const passwordMatches = compareSync(hmacPass, user.upass);

      if (!passwordMatches) {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    try {
      const accessToken = this.generateAccessToken(
        username,
        user.uid,
        dbSchema,
      );
      const refreshToken = this.generateRefreshToken(
        username,
        user.uid,
        dbSchema,
      );
      await this.storeRefreshToken(user.uid, refreshToken, dbSchema);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user,
      };
    } catch (e) {
      console.log('Error with generating tokens: ', e);
    }
  }

  async findUserByUsername(
    username: string,
    schema: string,
  ): Promise<User | undefined> {
    try {
      const query = `SELECT * FROM ${schema}.PQ_user WHERE ulogin='${username}'`;
      const [user] = await this.userRepository.manager.query(query);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to find user by username: ${username}: ${error.message}`,
      );
    }
  }

  generateAccessToken(ulogin: string, uid: number, dbSchema: string) {
    const payload = { username: ulogin, sub: uid, dbSchema };
    return this.jwtService.sign(payload, {
      expiresIn: '30m',
      secret: this.configService.get('SECRET_KEY'),
    });
  }

  generateRefreshToken(ulogin: string, uid: number, dbSchema: string) {
    const payload = { username: ulogin, sub: uid, dbSchema };
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('SECRET_KEY'),
    });
  }

  async storeRefreshToken(
    userId: number,
    refreshToken: string,
    dbSchema: string,
  ) {
    const tableName = `${this.NODE_ENV}-UsersSessions`;
    const command = new PutCommand({
      TableName: tableName,
      Item: {
        userId: userId.toString(),
        refreshToken,
        dbSchema,
      },
    });
    await this.dynamoDb.send(command);
  }

  async refreshToken(refreshToken: string, dbSchema: string) {
    const decoded = this.jwtService.verify(refreshToken);
    const user = await this.findUserByUsername(decoded.username, dbSchema);

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    const newAccessToken = this.generateAccessToken(
      user.ulogin,
      user.uid,
      dbSchema,
    );
    const newRefreshToken = this.generateRefreshToken(
      user.ulogin,
      user.uid,
      dbSchema,
    );

    await this.updateRefreshToken(user.uid, newRefreshToken, dbSchema);

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
    dbSchema: string,
  ) {
    const tableName = `${this.NODE_ENV}-UsersSessions`;
    const command = new UpdateCommand({
      TableName: tableName,
      Key: { userId: userId.toString() },
      UpdateExpression: 'set refreshToken = :r, dbSchema = :s',
      ExpressionAttributeValues: {
        ':r': refreshToken,
        ':s': dbSchema,
      },
    });
    await this.dynamoDb.send(command);
  }
}
