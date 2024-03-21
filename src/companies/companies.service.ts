import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAll(schema: string, { offset, limit }): Promise<Company[]> {
    try {
      return await this.companyRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_co LIMIT ${limit} OFFSET ${offset}`,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve companies: ${error.message}`,
      );
    }
  }

  async findOneByCoid(schema: string, coid: number): Promise<Company> {
    try {
      const [company] = await this.companyRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_co WHERE coid = '${coid}'`,
      );
      if (!company) {
        throw new NotFoundException(`Company with coid ${coid} not found.`);
      }
      return company;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve company with coid ${coid}: ${error.message}`,
      );
    }
  }

  async findOneByConame(
    schema: string,
    { offset, limit },
    coname: string,
  ): Promise<Company> {
    try {
      const [company] = await this.companyRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_co WHERE coname LIKE '%${coname}%' LIMIT ${limit} OFFSET ${offset}`,
      );
      return company;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve companies with coname like ${coname}: ${error.message}`,
      );
    }
  }
}
