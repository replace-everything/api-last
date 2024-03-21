// src/config/config.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './database-config.service';
import { DatabaseTestController } from './database-test.controller';

@Global()
@Module({
  imports: [NestConfigModule.forRoot()],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
  controllers: [DatabaseTestController],
})
export class DatabaseConfigModule {}
