import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inspection } from './entities/inspection.entity';

@Injectable()
export class PQInspectionsService {
  constructor(
    @InjectRepository(Inspection)
    private readonly PQInspectionsRepository: Repository<Inspection>,
  ) {}

  private formatSqlValue(key: string, value: any): string {
    if (value === null) {
      return 'NULL';
    } else if (typeof value === 'object') {
      return `'${JSON.stringify(value)}'`;
    } else if (typeof value === 'string') {
      // Identify datetime fields
      const dateTimeFields = ['indts', 'incomdts'];
      // Identify date fields
      const dateFields = [];

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
    createPQInspectionDto: Partial<Inspection>,
  ): Promise<Inspection> {
    try {
      const entries = Object.entries(createPQInspectionDto);
      const columns = entries.map(([key]) => `\`${key}\``).join(', ');
      const formattedValues = entries
        .map(([key, value]) => this.formatSqlValue(key, value))
        .join(', ');
      const [inspection] = await this.PQInspectionsRepository.manager.query(
        `INSERT INTO ${schema}.PQ_inspections(${columns}) VALUES(${formattedValues}) RETURNING *;`,
      );
      return inspection;
    } catch (error) {
      console.log('ERROR creating inspection', error);
      throw new InternalServerErrorException('Failed to create inspection');
    }
  }

  async findAll(schema: string): Promise<Inspection[]> {
    try {
      return await this.PQInspectionsRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_inspections;`,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch inspections');
    }
  }

  async findOne(schema: string, id: number): Promise<Inspection> {
    try {
      const [inspection] = await this.PQInspectionsRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_inspections WHERE inid = '${id}';`,
      );
      return inspection;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch inspection');
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
    updatePQInspectionDto: Partial<Inspection>,
  ): Promise<Inspection> {
    try {
      const setClause = Object.entries(updatePQInspectionDto)
        .map(([key, value]) => `"${key}" = ${this.escapeSQLString(value)}`)
        .join(', ');
      await this.PQInspectionsRepository.manager.query(
        `UPDATE ${schema}.PQ_inspections SET ${setClause} WHERE inid = '${id}';`,
      );
      return this.findOne(schema, id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update inspection');
    }
  }

  async remove(schema: string, id: number): Promise<void> {
    try {
      await this.PQInspectionsRepository.manager.query(
        `DELETE FROM ${schema}.PQ_inspections WHERE inid = '${id}';`,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove inspection');
    }
  }
}
