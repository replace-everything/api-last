// auth.service.ts
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findUserByUsername(
    username: string,
    schema: string,
  ): Promise<User | undefined> {
    try {
      const query = `SELECT * FROM ${schema}.PQ_user WHERE ulogin='${username}'`;
      console.log('QUERY', query);
      const [user] = await this.userRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_user WHERE ulogin='${username}'`,
      );
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to find user by username: ${username}: ${error.message}`,
      );
    }
  }

  async createUser(
    createUserDto: Partial<User>,
    schema: string,
  ): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.upass);
    const newUser = this.userRepository.create({
      ...createUserDto,
      upass: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async updateUser(
    uid: number,
    updateUserDto: Partial<User>,
    schema: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { uid } });
    if (!user) {
      throw new NotFoundException(`User with ID ${uid} not found.`);
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async login(
    username: string,
    password: string,
    schema: string,
    uid?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.findUserByUsername(username, schema);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await this.comparePasswords(password, user.upass);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  async refreshToken(
    refreshToken: string,
    schema: string,
  ): Promise<{ accessToken: string }> {
    try {
      const { uid } = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.userRepository.findOne({ where: { uid } });
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const accessToken = this.generateAccessToken(user);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private generateAccessToken(user: User): string {
    const payload = { uid: user.uid, username: user.ulogin };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  private generateRefreshToken(user: User): string {
    const payload = { uid: user.uid };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
