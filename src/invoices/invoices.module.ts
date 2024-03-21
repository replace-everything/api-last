import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { InvoiceRepository } from './invoice.repository';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), DatabaseModule],
  providers: [InvoicesService, InvoiceRepository],
  controllers: [InvoicesController],
  exports: [TypeOrmModule, InvoicesService, InvoiceRepository],
})
export class InvoicesModule {}
