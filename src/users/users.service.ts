import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationPipe } from '../common/pipes/pagination.pipe';
import { Client } from '../clients/entities/client.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Event } from '../events/entities/event.entity';
import { Inspection } from '../inspections/entities/inspection.entity';

export interface ClientsAndLeads {
  clients: Client[]; // Assuming 'Client' is your client entity type
  leads: Lead[]; // Assuming 'Lead' is your lead entity type
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(pagination: PaginationPipe): Promise<User[]> {
    try {
      return await this.userRepository.find({
        skip: pagination.offset,
        take: pagination.limit,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findOne(userId: number): Promise<User> {
    Logger.log('In the findOne service', userId);
    console.log('In the findOne service', userId);
    const user = await this.userRepository.findOne({
      where: {
        uid: userId,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async findLeadsByUserId(
    userId: number,
    pagination: PaginationPipe,
  ): Promise<any[]> {
    const { offset, limit } = pagination;

    const leads = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('PQ_leads', 'lead', 'user.uid = lead.luid')
      .where('user.uid = :userId', { userId })
      .select('lead.*')
      .offset(offset)
      .limit(limit)
      .getRawMany();

    if (!leads.length) {
      throw new NotFoundException(`Leads for user ID ${userId} not found`);
    }

    return leads;
  }

  async findInvoicesByUserId(
    userId: number,
    pagination: PaginationPipe,
  ): Promise<any[]> {
    const { offset, limit } = pagination;

    const invoices = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('PQ_invoice', 'invoice', 'user.uid = invoice.invuid')
      .where('user.uid = :userId', { userId })
      .select('invoice.*')
      .offset(offset)
      .limit(limit)
      .getRawMany();

    if (!invoices.length) {
      throw new NotFoundException(`Invoices for user ID ${userId} not found`);
    }

    return invoices;
  }

  async findClientsByUserId(
    userId: number,
    pagination: PaginationPipe,
  ): Promise<Client[]> {
    const { offset, limit } = pagination;

    const clients = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('PQ_client', 'client', 'user.uid = client.cuid')
      .where('user.uid = :userId', { userId })
      .select('client.*')
      .offset(offset)
      .limit(limit)
      .getRawMany();

    if (!clients.length) {
      throw new NotFoundException(`Clients for user ID ${userId} not found`);
    }

    return clients;
  }

  async findClientsAndLeadsByUserId(
    userId: number,
    pagination: PaginationPipe,
  ): Promise<ClientsAndLeads> {
    console.log('UID', userId);
    try {
      const [clients, leads] = await Promise.all([
        await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('PQ_client', 'client', 'user.uid = client.cuid')
          .where('user.uid = :userId', { userId })
          .select('*')
          .offset(pagination.offset)
          .limit(pagination.limit)
          .getRawMany(),
        await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect(
            'PQ_invoice',
            'invoice',
            'user.uid = invoice.invuid',
          )
          .where('user.uid = :userId', { userId })
          .select('*')
          .offset(pagination.offset)
          .limit(pagination.limit)
          .getRawMany(),
      ]);

      return { clients, leads };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve clients and leads',
      );
    }
  }

  async findEventsByUserId(
    userId: number,
    pagination: PaginationPipe,
  ): Promise<Event[]> {
    const { offset, limit } = pagination;

    const events = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('PQ_events', 'event', 'user.uid = event.euid')
      .leftJoinAndSelect('PQ_job', 'job', 'event.ejid = job.jid')
      .leftJoinAndSelect('PQ_client', 'client', 'event.ecid = client.cid')
      .leftJoinAndSelect('PQ_leads', 'leads', 'event.elid = leads.lid')
      .where('user.uid = :userId', { userId })
      .select('*')
      .offset(offset)
      .limit(limit)
      .getRawMany();

    if (!events.length) {
      throw new NotFoundException(`Events for user ID ${userId} not found`);
    }

    return events;
  }

  async findInspectionsByUserId(
    userId: number,
    pagination: PaginationPipe,
  ): Promise<Inspection[]> {
    const { offset, limit } = pagination;

    const inspections = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('PQ_leads', 'lead', 'lead.luid = user.uid')
      .leftJoinAndSelect('PQ_client', 'client', 'client.cuid = user.uid')
      .leftJoinAndSelect('PQ_job', 'job', 'job.juid = user.uid')
      .leftJoinAndSelect(
        'PQ_inspections',
        'inspection',
        'inspection.inlid = lead.lid OR inspection.incid = client.cid OR inspection.injid = job.jid',
      )
      .where('user.uid = :userId', { userId })
      .select('inspection.*')
      .offset(offset)
      .limit(limit)
      .getRawMany();

    if (!inspections.length) {
      throw new NotFoundException(
        `Inspections for user ID ${userId} not found`,
      );
    }

    return inspections;
  }

  async findTasksByUserId(
    userId: number,
    pagination: PaginationPipe,
  ): Promise<Event[]> {
    const { offset, limit } = pagination;

    const events = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('PQ_tasks', 'task', 'user.uid = task.tuid')
      .leftJoinAndSelect('PQ_job', 'job', 'task.tjid = job.jid')
      .leftJoinAndSelect(
        'PQ_insuranceClaims',
        'claim',
        'task.ticid = claim.icid',
      )
      .leftJoinAndSelect(
        'PQ_workOrders',
        'workOrder',
        'task.twoid = workOrder.woid',
      )
      .where('user.uid = :userId', { userId })
      .select('*')
      .offset(offset)
      .limit(limit)
      .getRawMany();

    if (!events.length) {
      throw new NotFoundException(`Events for user ID ${userId} not found`);
    }

    return events;
  }
}
