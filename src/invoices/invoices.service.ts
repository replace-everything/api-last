import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { PaginationPipe } from '../common/pipes/pagination.pipe';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoicesRepository: Repository<Invoice>,
  ) {}

  private filterFormat = (value: string | number) => {
    if (typeof value === 'string' && value.length > 0) {
      const isoDatePattern =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
      if (isoDatePattern.test(value)) {
        return `'${value}'`;
      } else {
        return `'${value.replace(/'/g, "''")}'`;
      }
    }
    if (typeof value === 'number') {
      return value;
    }
    return 'NULL';
  };

  async findAll(
    schema: string,
    pagination?: PaginationPipe,
  ): Promise<Invoice[]> {
    try {
      let query = `SELECT * FROM ${schema}.PQ_invoice`;
      if (pagination?.limit && pagination.offset) {
        query += ` LIMIT ${pagination.limit} OFFSET ${pagination.offset};`;
      } else {
        query += ';';
      }
      return await this.invoicesRepository.manager.query(query);
    } catch (error) {
      console.error('Error: ', error);
      throw new InternalServerErrorException('Failed to retrieve invoices');
    }
  }

  async findOne(schema: string, invid: number): Promise<Invoice> {
    try {
      const query = `SELECT * FROM ${schema}.PQ_invoice WHERE invid = ${this.filterFormat(invid)};`;
      const invoices = await this.invoicesRepository.manager.query(query);
      return invoices[0];
    } catch (error) {
      console.error('Error: ', error);
      throw new InternalServerErrorException(
        'Failed to retrieve invoice by ID',
      );
    }
  }

  async findInvoicesByUid(
    schema: string,
    userId: number,
    pagination?: PaginationPipe,
  ): Promise<Invoice[]> {
    try {
      let query = `SELECT * FROM ${schema}.PQ_invoice WHERE invuid = ${this.filterFormat(userId)}`;
      if (pagination?.limit && pagination.offset) {
        query += ` LIMIT ${pagination.limit} OFFSET ${pagination.offset};`;
      } else {
        query += ';';
      }
      return await this.invoicesRepository.manager.query(query);
    } catch (error) {
      console.error('Error: ', error);
      throw new InternalServerErrorException(
        'Failed to retrieve invoices for user',
      );
    }
  }
}
