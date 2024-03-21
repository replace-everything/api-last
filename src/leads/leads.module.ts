// leads.module.ts (or the module where Lead entity should be registered)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lead]), DatabaseModule], // Correctly register the Lead entity
  providers: [LeadsService],
  controllers: [LeadsController],
  exports: [TypeOrmModule], // Export TypeOrmModule if you plan to use the repository outside this module
})
export class LeadsModule {}
