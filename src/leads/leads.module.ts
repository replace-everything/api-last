import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Lead } from './entities/lead.entity';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { LeadRepository } from './leads.repository';
import { UserRepository } from '../users/users.repository';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, UserRepository]),
    UsersModule,
    DatabaseModule,
  ],
  providers: [LeadsService, LeadRepository, UserRepository],
  controllers: [LeadsController],
  exports: [TypeOrmModule, LeadRepository, LeadsService],
})
export class LeadsModule {}
