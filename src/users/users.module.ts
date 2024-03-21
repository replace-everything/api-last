import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { Lead } from '../leads/entities/lead.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database.module';
import { Client } from '../clients/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Lead, Invoice, Client]),
    DatabaseModule,
  ],
  providers: [UsersService, UserRepository],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
