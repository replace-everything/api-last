import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
  ) {}

  private escapeSQLString(value: any): string {
    if (typeof value === 'string') {
      return `'${value.replace(/'/g, "''")}'`;
    }
    return value;
  }

  private formatSqlValue(key: string, value: any): string {
    if (value === null) {
      return 'NULL';
    } else if (typeof value === 'string') {
      // Identify datetime fields
      const dateTimeFields = ['cadate', 'cedate'];
      // Identify date fields
      const dateFields = [
        'badate',
        'bedate',
        'binstall',
        'blastserv',
        'bnextserv',
        'blastrep',
        'bnextrep',
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

  async findAll(schema: string): Promise<Building[]> {
    try {
      const buildings = await this.buildingRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_building;`,
      );
      return buildings;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch buildings');
    }
  }

  async findOne(schema: string, id: number): Promise<Building> {
    try {
      const [building] = await this.buildingRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_building WHERE bid = '${id}';`,
      );
      return building;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch building with ID ${id}`,
      );
    }
  }

  async create(
    schema: string,
    buildingData: Partial<Building>,
  ): Promise<Building> {
    const entries = Object.entries(buildingData);
    const columns = entries.map(([key]) => `\`${key}\``).join(', ');
    const formattedValues = entries
      .map(([key, value]) => this.formatSqlValue(key, value))
      .join(', ');

    try {
      const [returnBldg] = await this.buildingRepository.manager.query(
        `INSERT INTO ${schema}.PQ_building (${columns}) VALUES (${formattedValues}) RETURNING *;`,
      );
      return returnBldg; // Simplified for brevity, ideally fetch and return the inserted row
    } catch (error) {
      console.log('Building create error: ', error);
      throw new InternalServerErrorException('Failed to create building');
    }
  }

  async update(
    schema: string,
    id: number,
    buildingData: Partial<Building>,
  ): Promise<void> {
    const setClause = Object.entries(buildingData)
      .map(([key, value]) => `"${key}" = ${this.escapeSQLString(value)}`)
      .join(', ');

    try {
      await this.buildingRepository.manager.query(
        `UPDATE ${schema}.PQ_building SET ${setClause} WHERE bid = '${id}';`,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update building with ID ${id}`,
      );
    }
  }

  async remove(schema: string, id: number): Promise<void> {
    try {
      await this.buildingRepository.manager.query(
        `DELETE FROM ${schema}.PQ_building WHERE bid = '${id}';`,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete building with ID ${id}`,
      );
    }
  }
}
