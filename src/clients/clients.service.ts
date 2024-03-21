import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class PQClientService {
  constructor(
    @InjectRepository(Client)
    private clientsService: Repository<Client>,
  ) {}

  private formatSqlValue(key: string, value: any): string {
    if (value === null) {
      return 'NULL';
    } else if (typeof value === 'string') {
      // Identify datetime fields
      const dateTimeFields = ['cadate', 'cedate'];
      // Identify date fields
      const dateFields = ['cstatusdate', 'clastcontact', 'cinspection'];

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

  async create(
    schema: string,
    createPQClientDto: DeepPartial<Client>,
  ): Promise<Client> {
    const entries = Object.entries(createPQClientDto);
    const columns = entries.map(([key]) => `\`${key}\``).join(', ');
    const formattedValues = entries
      .map(([key, value]) => this.formatSqlValue(key, value))
      .join(', ');
    const query = `INSERT INTO ${schema}.PQ_client (${columns}) VALUES(${formattedValues}) RETURNING *;`;

    try {
      const [newLead] = await this.clientsService.manager.query(query);
      return newLead;
    } catch (error) {
      console.log('ERROR', error);
      throw new InternalServerErrorException('Failed to create client', error);
    }
  }

  async findAll(schema: string): Promise<Client[]> {
    try {
      return await this.clientsService.manager.query(
        `SELECT * FROM ${schema}.PQ_client;`,
      );
    } catch (error) {
      console.log('ERROR', error);
      throw new InternalServerErrorException('Failed to retrieve clients');
    }
  }

  async findOne(schema: string, id: number): Promise<Client> {
    try {
      const [client] = await this.clientsService.manager.query(
        `SELECT * FROM ${schema}.PQ_client WHERE cid = ${id};`,
      );
      if (!client)
        throw new NotFoundException(`Client with ID ${id} not found`);
      return client;
    } catch (error) {
      console.log('ERROR', error);
      throw new InternalServerErrorException('Failed to retrieve client');
    }
  }

  private escapeSQLString(value) {
    if (typeof value === 'string') {
      // Simple escape for single quotes - this is a naive approach, be very cautious!
      return `'${value.replace(/'/g, "''")}'`;
    }
    return value;
  }

  async update(
    schema: string,
    id: number,
    updateClientDto: DeepPartial<Client>,
  ): Promise<Client> {
    try {
      const coercedDto = this.coerceClientDto(updateClientDto);
      const setClause = Object.entries(coercedDto)
        .map(([key, value]) => `"${key}" = ${this.escapeSQLString(value)}`)
        .join(', ');
      await this.clientsService.manager.query(
        `UPDATE ${schema}.PQ_client SET ${setClause} WHERE cid = "${id}";`,
      );
      return this.findOne(schema, id);
    } catch (error) {
      console.log('ERROR', error);
      throw new InternalServerErrorException('Failed to update client');
    }
  }

  async remove(schema: string, id: number): Promise<void> {
    try {
      await this.clientsService.manager.query(
        `DELETE FROM ${schema}.PQ_client WHERE cid = "${id}";`,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove client');
    }
  }
  private coerceClientDto(dto: DeepPartial<Client>): DeepPartial<Client> {
    Object.entries(dto).forEach(([key, value]) => {
      if (
        typeof value === 'string' &&
        !key.includes('phone') &&
        /^\d+$/.test(value)
      ) {
        dto[key] = Number(value);
      } else if (
        typeof value === 'string' &&
        (key.toLowerCase().endsWith('date') ||
          key.toLowerCase().endsWith('lastcontact'))
      ) {
        const parsedDate = Date.parse(value);
        if (!isNaN(parsedDate)) {
          dto[key] = new Date(parsedDate);
        }
      }
    });
    return dto;
  }
}
