import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { PaginationPipe } from '../common/pipes/pagination.pipe';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private readonly leadsRepository: Repository<Lead>,
  ) {}

  async findAll(schema: string, pagination: PaginationPipe): Promise<Lead[]> {
    const query = `SELECT * FROM ${schema}.PQ_leads LIMIT ${pagination.limit} OFFSET ${pagination.offset};`;
    try {
      const leads = await this.leadsRepository.manager.query(query);
      return leads;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve leads', error);
    }
  }

  async findOne(schema: string, lid: number): Promise<Lead> {
    try {
      const leads = await this.leadsRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_leads WHERE lid = '${lid}'`,
      );
      if (leads.length === 0) {
        throw new NotFoundException(`Lead with ID ${lid} not found.`);
      }
      return leads[0];
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve lead', error);
    }
  }

  private formatSqlValue(key: string, value: any): string {
    if (value === null) {
      return 'NULL';
    } else if (typeof value === 'string') {
      // Identify datetime fields
      const dateTimeFields = ['ladate'];
      // Identify date fields
      const dateFields = [
        'lstatusdate',
        'llastcontact',
        'linspection',
        'linspectioncomp',
      ];

      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        if (dateTimeFields.includes(key)) {
          // Format as "YYYY-MM-DD HH:MM:SS" for datetime fields
          return `'${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}'`;
        } else if (dateFields.includes(key)) {
          // Format as "YYYY-MM-DD" for date fields
          return `'${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}'`;
        }
      }

      // For non-date strings, escape single quotes by doubling them
      return `'${value.replace(/'/g, "''")}'`;
    } else if (typeof value === 'number') {
      return value.toString();
    } else {
      throw new Error(`Unsupported data type for key ${key}: ${typeof value}`);
    }
  }

  async create(schema: string, leadData: Partial<Lead>): Promise<Lead> {
    const entries = Object.entries(leadData);
    const columns = entries.map(([key]) => `\`${key}\``).join(', ');
    const formattedValues = entries
      .map(([key, value]) => this.formatSqlValue(key, value))
      .join(', ');
    const query = `INSERT INTO ${schema}.PQ_leads (${columns}) VALUES(${formattedValues}) RETURNING *;`;

    try {
      const [newLead] = await this.leadsRepository.manager.query(query);
      return newLead;
    } catch (error) {
      console.log('ERROR', error);
      throw new InternalServerErrorException('Failed to create lead', error);
    }
  }
}
