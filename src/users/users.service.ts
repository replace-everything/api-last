import { Repository } from 'typeorm';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Client } from '../clients/entities/client.entity';
import { PaginationPipe } from '../common/pipes/pagination.pipe';
import { Event } from '../events/entities/event.entity';
import { Inspection } from '../inspections/entities/inspection.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserByUsername(
    username: string,
    schema: string,
  ): Promise<User | undefined> {
    try {
      const query = `SELECT * FROM ${schema}.PQ_user WHERE ulogin='${username}'`;
      console.log('QUERY', query);
      const [user] = await this.userRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_user WHERE ulogin='${username}'`,
      );
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to find user by username: ${username}: ${error.message}`,
      );
    }
  }

  private escapeSQLString(value) {
    if (typeof value === 'string') {
      // Simple escape for single quotes - this is a naive approach, be very cautious!
      return `'${value.replace(/'/g, "''")}'`;
    }
    return value;
  }

  async updateUser(
    uid: number,
    updateUserDto: Partial<User>,
    schema: string,
  ): Promise<User> {
    const setClause = Object.entries(updateUserDto)
      .map(([key, value]) => `"${key}" = ${this.escapeSQLString(value)}`)
      .join(', ');

    try {
      const [updatedUser] = await this.userRepository.manager.query(
        `UPDATE ${schema}.PQ_user SET ${setClause} WHERE uid = '${uid}' RETURNING *;`,
      );
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${uid} not found.`);
      }
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update user with ID ${uid}: ${error.message}`,
      );
    }
  }

  async deleteUser(uid: number, schema: string): Promise<void> {
    try {
      const result = await this.userRepository.manager.query(
        `DELETE FROM ${schema}.PQ_user WHERE uid = '${uid}'`,
      );
      if (result.rowCount === 0) {
        throw new NotFoundException(`User with ID ${uid} not found.`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete user with ID ${uid}: ${error.message}`,
      );
    }
  }

  async findAll(
    schema: string,
    { offset, limit }: PaginationPipe,
  ): Promise<User[]> {
    try {
      return await this.userRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_user LIMIT ${limit} OFFSET ${offset}`,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve users: ${error.message}`,
      );
    }
  }

  // Assuming the same direct interpolation approach for the findOne method
  async findOne(schema: string, userId: number): Promise<User> {
    try {
      const [user] = await this.userRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_user WHERE uid = '${userId}'`,
      );
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve user with ID ${userId}: ${error.message}`,
      );
    }
  }

  async findLeadsByUserId(
    schema: string,
    userId: number,
    { offset, limit }: PaginationPipe,
  ): Promise<Lead[]> {
    try {
      return await this.userRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_leads WHERE luid = '${userId}' LIMIT ${limit} OFFSET ${offset}`,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve leads for user ID ${userId}: ${error.message}`,
      );
    }
  }

  async findInvoicesByUserId(
    schema: string,
    userId: number,
    { offset, limit }: PaginationPipe,
  ): Promise<Invoice[]> {
    try {
      return await this.userRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_invoice WHERE invuid = '${userId}' LIMIT ${limit} OFFSET ${offset}`,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve invoices for user ID ${userId}: ${error.message}`,
      );
    }
  }

  async findClientsByUserId(
    schema: string,
    userId: number,
    { offset, limit }: PaginationPipe,
  ): Promise<Client[]> {
    try {
      return await this.userRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_client WHERE cuid = '${userId}' LIMIT ${limit} OFFSET ${offset}`,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve clients for user ID ${userId}: ${error.message}`,
      );
    }
  }

  async findClientsAndLeadsByUserId(
    schema: string,
    userId: number,
    pagination: PaginationPipe,
  ): Promise<{
    clients: Client[];
    leads: Lead[];
  }> {
    try {
      const clients = await this.findClientsByUserId(
        schema,
        userId,
        pagination,
      );
      const leads = await this.findLeadsByUserId(schema, userId, pagination);
      return { clients, leads };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve clients and leads: ${error.message}`,
      );
    }
  }

  async findEventsByUserId(
    schema: string,
    userId: number,
    pagination: PaginationPipe,
  ): Promise<Event[]> {
    const { offset, limit } = pagination;

    const query = `
    SELECT *
    FROM ${schema}.PQ_events AS event
    LEFT JOIN ${schema}.PQ_job AS job ON event.ejid = job.jid
    LEFT JOIN ${schema}.PQ_client AS client ON event.ecid = client.cid
    LEFT JOIN ${schema}.PQ_leads AS leads ON event.elid = leads.lid
    WHERE event.euid = ${userId}
    LIMIT ${limit} OFFSET ${offset}
  `;

    try {
      const events = await this.userRepository.manager.query(query);

      return events;
    } catch (e) {
      throw new InternalServerErrorException(
        `Failed to find events by ID ${userId}: ${e.message}`,
      );
    }
  }

  async findInspectionsByUserId(
    schema: string,
    userId: number,
    pagination: PaginationPipe,
  ): Promise<Inspection[]> {
    const { offset, limit } = pagination;
    try {
      const query = `
    SELECT inspection.*
    FROM ${schema}.PQ_inspections AS inspection
    LEFT JOIN ${schema}.PQ_leads AS lead ON inspection.inlid = lead.lid
    LEFT JOIN ${schema}.PQ_client AS client ON inspection.incid = client.cid
    LEFT JOIN ${schema}.PQ_job AS job ON inspection.injid = job.jid
    WHERE lead.luid = ${userId} OR client.cuid = ${userId} OR job.juid = ${userId} 
    LIMIT ${limit} OFFSET ${offset}
  `;

      return await this.userRepository.manager.query(query);
    } catch (e) {
      throw new InternalServerErrorException(
        `Failed to find inspections with ID ${userId}: ${e.message}`,
      );
    }
  }

  async findTasksByUserId(
    schema: string,
    userId: number,
    pagination: PaginationPipe,
  ): Promise<Task[]> {
    const { offset, limit } = pagination;

    const query = `
    SELECT task.*, job.*, claim.*, workOrder.*
    FROM ${schema}.PQ_tasks AS task
    LEFT JOIN ${schema}.PQ_job AS job ON task.tjid = job.jid
    LEFT JOIN ${schema}.PQ_insuranceClaims AS claim ON task.ticid = claim.icid
    LEFT JOIN ${schema}.PQ_workOrders AS workOrder ON task.twoid = workOrder.woid
    WHERE task.tuid = ${userId}
    LIMIT ${limit} OFFSET ${offset}
  `;

    try {
      const tasks = await this.userRepository.manager.query(query);

      return tasks;
    } catch (e) {
      throw new InternalServerErrorException(
        `Failed to find tasks by UID: ${e.message}`,
      );
    }
  }

  async searchByName(schema: string, query: string): Promise<User[]> {
    try {
      return await this.userRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_user WHERE ufirstn LIKE '%${query}%' OR ulastn LIKE '%${query}%'`,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to search users by name: ${error.message}`,
      );
    }
  }
}
