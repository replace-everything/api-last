import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async findInvoicesByUid(userId: number): Promise<Invoice[]> {
    try {
      const result = await this.invoiceRepository.find({
        where: { invuid: userId },
      });
      return result;
    } catch (e) {
      throw new Error('Unable to fetch invoices give that user.');
    }
  }
}
