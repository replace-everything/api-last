import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { ConfigService } from '@nestjs/config';
import { WriteError } from 'typeorm';

@Injectable()
export class DatabaseConfigService implements OnModuleInit {
  private secret;
  private s3BucketName: string;
  private secretsManagerClient = new SecretsManagerClient({
    region: 'us-east-1',
  });
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      this.s3BucketName = `raes-photos-dev`;
      await this.fetchSecret();
      this.setSecretAsEnv();
    } catch (e) {
      console.log('Error in DB Confir Module Init', e);
      throw new WriteError(e);
    }
  }

  private async fetchSecret() {
    const arn = process.env.DB_CREDENTIALS_ARN;
    try {
      if (arn) {
        const secretValueResponse = await this.secretsManagerClient.send(
          new GetSecretValueCommand({ SecretId: arn }),
        );
        const secretString = JSON.parse(secretValueResponse.SecretString);
        this.secret = secretString;
      } else {
        console.error(
          'No matching secret found for the provided partial ARN:',
          arn,
        );
        throw new Error('SecretNotFound');
      }
    } catch (error) {
      console.error('Error fetching secret from AWS Secrets Manager:', error);
      throw error;
    }
  }

  async getDatabaseConfig() {
    if (this.secret) {
      return {
        type: this.secret.engine,
        host: this.secret.host,
        port: this.secret.port,
        username: this.secret.username,
        password: this.secret.password,
      };
    } else {
      await this.fetchSecret();
      return {
        type: this.secret.engine,
        host: this.secret.host,
        port: this.secret.port,
        username: this.secret.username,
        password: this.secret.password,
      };
    }
  }

  getS3BucketName(): string {
    return this.s3BucketName;
  }

  private setSecretAsEnv() {
    if (this.secret) {
      Object.entries(this.secret).forEach(([key, value]) => {
        this.configService.set(key, value);
        process.env[key] = `${value}`;
      });
    }
  }
}
