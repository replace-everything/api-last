import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity'; // Import the Lead entity
import { User } from '../users/entities/user.entity'; // Import the User entity

@Injectable()
export class LeadRepository {
  constructor(
    @InjectRepository(Lead) private readonly leadRepository: Repository<Lead>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Fetches leads for a specific user.
   * @param luid - The ID of the user.
   * @returns A promise that resolves to an array of leads.
   */
  async findByUserId(luid: number): Promise<Lead[]> {
    return this.leadRepository
      .createQueryBuilder('lead')
      .where('lead.luid = :luid', { luid })
      .getMany();
  }

  /**
   * Fetches users with leads.
   * @param offset - The offset for pagination.
   * @param limit - The limit for pagination.
   * @returns A promise that resolves to an array of users.
   */
  async findUsersWithLeads(
    offset: number = 0,
    limit: number = 10,
  ): Promise<User[]> {
    // Validate offset and limit
    offset = Math.max(0, Number(offset));
    limit = Math.min(Math.max(1, Number(limit)), 100);

    try {
      return this.userRepository
        .createQueryBuilder('user')
        .innerJoin('user.leads', 'lead') // Assuming 'user.leads' is the relation.
        .distinct(true) // To return only distinct users.
        .skip(offset) // Pagination offset.
        .take(limit) // Pagination limit.
        .getMany(); // Get the results.
    } catch (error) {
      // Optionally, log the error or handle specific error types differently.
      throw new InternalServerErrorException(
        'Failed to retrieve users with leads',
      );
    }
  }
}
