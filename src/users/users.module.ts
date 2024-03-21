import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Lead } from '../leads/entities/lead.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { UsersController } from './users.controller';
import { Client } from '../clients/entities/client.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Lead, Invoice, Client]),
    PassportModule,
    ConfigModule,
  ],
  providers: [UsersService, JwtStrategy],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
