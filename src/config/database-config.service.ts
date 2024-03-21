import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  SecretsManagerClient,
  ListSecretsCommand,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

@Injectable()
export class DatabaseConfigService implements OnModuleInit {
  private secret;
  private isOffline: boolean;
  private s3BucketName: string;
  private secretsManagerClient = new SecretsManagerClient({
    region: 'us-east-1',
  });

  async onModuleInit() {
    this.s3BucketName = `raes-photos-dev`;
    this.isOffline =
      process.env.NODE_ENV === 'local' ||
      process.env.AWS_LAMBDA_FUNCTION_NAME?.includes('lcl');

    await this.fetchSecret();
  }

  private async fetchSecret() {
    const partialArn = process.env.DB_CREDENTIALS_ARN;
    try {
      const listSecretsResponse = await this.secretsManagerClient.send(
        new ListSecretsCommand({}),
      );
      const secret = listSecretsResponse.SecretList.find((s) =>
        s.ARN.includes(partialArn),
      );

      if (secret?.ARN) {
        const secretValueResponse = await this.secretsManagerClient.send(
          new GetSecretValueCommand({ SecretId: secret.ARN }),
        );
        this.secret = JSON.parse(secretValueResponse.SecretString);
      } else {
        console.error(
          'No matching secret found for the provided partial ARN:',
          partialArn,
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
        database: this.secret.database,
      };
    } else {
      await this.fetchSecret();
      return {
        type: this.secret.engine,
        host: this.secret.host,
        port: this.secret.port,
        username: this.secret.username,
        password: this.secret.password,
        database: this.secret.database,
      };
    }
  }

  getIsOffline(): boolean {
    return this.isOffline;
  }

  getS3BucketName(): string {
    return this.s3BucketName;
  }
}
