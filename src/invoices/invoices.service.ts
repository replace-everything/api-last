import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Invoice } from './entities/invoice.entity';
import { PaginationPipe } from '../common/pipes/pagination.pipe';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoicesRepository: Repository<Invoice>,
  ) {}

  findAll(pagination?: PaginationPipe): Promise<Invoice[]> {
    const skip = ((pagination.offset || 1) - 1) * pagination.limit;
    try {
      return this.invoicesRepository.find({
        skip,
        take: pagination.limit,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve invoices');
    }
  }

  findOne(invid: number): Promise<Invoice> {
    return this.invoicesRepository.findOne({ where: { invid } });
  }

  async findInvoicesByUid(
    userId: number,
    pagination?: PaginationPipe,
  ): Promise<Invoice[]> {
    try {
      return this.invoicesRepository.find({
        where: { invuid: userId },
        skip: pagination.offset,
        take: pagination.limit,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve invoices for user',
      );
    }
  }
}
