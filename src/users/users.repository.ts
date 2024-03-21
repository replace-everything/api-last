import { BadRequestException, Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersServiceInput } from './dtos/userInput.dto';
import { plainToClass } from 'class-transformer';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(pagination: PaginationPipe): Promise<User[]> {
    const skip = ((pagination.offset || 1) - 1) * pagination.limit;
    return await this.userRepository.find({
      skip,
      take: pagination.limit,
    });
  }

  async validateInput(input: UsersServiceInput) {
    try {
      await validateOrReject(plainToClass(UsersServiceInput, input));
    } catch (errors) {
      throw new BadRequestException('Validation failed', errors);
    }
  }

  // Method to find users with leads
  async findUsersWithLeads(): Promise<{ users: User[] }> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('PQ_leads', 'lead', 'lead.luid = user.uid')
      .getMany();

    return { users };
  }
}
