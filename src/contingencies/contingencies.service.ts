import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contingency } from './contingency.entity';

@Injectable()
export class ContingencyService {
  constructor(
    @InjectRepository(Contingency)
    private readonly contingencyRepository: Repository<Contingency>,
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

  async findAll(schema: string): Promise<Contingency[]> {
    try {
      return await this.contingencyRepository.manager.query(
        `SELECT * FROM \`${schema}\`.PQ_contingency;`,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch contingencies');
    }
  }

  async findOne(schema: string, id: number): Promise<Contingency> {
    try {
      const [contingency] = await this.contingencyRepository.manager.query(
        `SELECT * FROM \`${schema}\`.PQ_contingency WHERE \`ctid\` = '${id}';`,
      );
      return contingency;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch contingency');
    }
  }

  async create(
    schema: string,
    contingencyData: Partial<Contingency>,
  ): Promise<Contingency> {
    const columns = Object.keys(contingencyData)
      .map((key) => `\`${key}\``)
      .join(', ');
    const formattedValues = Object.values(contingencyData)
      .map((value: string | number) => this.filterFormat(value))
      .join(', ');

    try {
      const [newContingency] = await this.contingencyRepository.manager.query(
        `INSERT INTO \`${schema}\`.PQ_contingency (${columns}) VALUES (${formattedValues}) RETURNING *;`,
      );
      return newContingency;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create contingency');
    }
  }

  async update(
    schema: string,
    id: number,
    contingencyData: Partial<Contingency>,
  ): Promise<Contingency> {
    const updateSet = Object.entries(contingencyData)
      .map(([key, value]) => `\`${key}\` = ${this.filterFormat(value as any)}`)
      .join(', ');

    try {
      await this.contingencyRepository.manager.query(
        `UPDATE \`${schema}\`.PQ_contingency SET ${updateSet} WHERE \`ctid\` = '${id}' RETURNING *;`,
      );
      return this.findOne(schema, id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update contingency');
    }
  }

  async remove(schema: string, id: number): Promise<void> {
    try {
      await this.contingencyRepository.manager.query(
        `DELETE FROM \`${schema}\`.PQ_contingency WHERE \`ctid\` = '${id}';`,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete contingency');
    }
  }
}
