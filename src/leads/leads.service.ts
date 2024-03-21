import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Lead } from './entities/lead.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationPipe } from '../common/pipes/pagination.pipe';
import { CreateLeadDto } from './dtos/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private readonly leadsRepository: Repository<Lead>,
  ) {}

  findAll(pagination: PaginationPipe): Promise<Lead[]> {
    try {
      return this.leadsRepository.find({
        skip: pagination.offset,
        take: pagination.limit,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve leads');
    }
  }

  findOne(lid: number): Promise<Lead> {
    return this.leadsRepository.findOne({ where: { lid } });
  }

  async getLeadsByUid(
    luid: number,
    pagination: PaginationPipe,
  ): Promise<Lead[]> {
    try {
      const leads = await this.leadsRepository
        .createQueryBuilder('lead')
        .where('lead.luid = :luid', { luid })
        .offset(pagination.offset)
        .limit(pagination.limit)
        .getMany();

      if (leads.length === 0) {
        throw new NotFoundException(`Leads for User ID ${luid} not found.`);
      }

      return leads;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve leads');
    }
  }

  async create(leadData: CreateLeadDto): Promise<Lead> {
    try {
      const newLead = this.leadsRepository.create(leadData);
      const retLead = await this.leadsRepository.save(newLead[0]);
      return retLead;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create lead');
    }
  }
}
