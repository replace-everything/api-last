import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '../invoices/entities/invoice.entity';
import { Lead } from '../leads/entities/lead.entity';
import { User } from '../users/entities/user.entity';
import { PQClientController } from './clients.controller';
import { PQClientService } from './clients.service';
import { Client } from './entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Invoice, Lead, User])],
  controllers: [PQClientController],
  providers: [PQClientService],
})
export class ClientsModule {}
