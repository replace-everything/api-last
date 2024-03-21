import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { PaginationPipe } from '../common/pipes/pagination.pipe';
import { Invoice } from '../invoices/entities/invoice.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { Lead } from '../leads/entities/lead.entity';
import { Event } from '../events/entities/event.entity';
import { Inspection } from '../inspections/entities/inspection.entity';
import { Client } from '../clients/entities/client.entity';
import { Task } from '../tasks/entities/task.entity';

@ApiTags('users') // Tag for all 'users' operations
@Controller('users')
export class UsersController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Retrieves a paginated list of users' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Users retrieved', type: [User] })
  findAll(@Query(PaginationPipe) pagination): Promise<User[]> {
    return this.usersService.findAll(pagination);
  }

  @Get('with-leads')
  @ApiOperation({ summary: 'Finds users along with their leads' })
  @ApiResponse({ status: 200, description: 'Users with leads', type: [User] })
  @ApiResponse({
    status: 500,
    description: 'Server error fetching leads for the user',
  })
  async findUsersWithLeads(): Promise<User[]> {
    try {
      const { users } = await this.userRepository.findUsersWithLeads();
      return users;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'An error occurred while fetching users.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':uid')
  @ApiOperation({ summary: 'Finds a single user by ID' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('uid') id: number) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'An error occurred while fetching this user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':uid/leads')
  @ApiOperation({ summary: 'Retrieves leads for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Leads found', type: [Lead] }) // Assuming leads are separate entities
  @ApiResponse({ status: 404, description: 'User not found' })
  async findLeadsByUserId(
    @Param('uid') userId: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
  ) {
    try {
      return await this.usersService.findLeadsByUserId(userId, pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'An error occurred while fetching leads by user ID.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':uid/inspections')
  @ApiOperation({ summary: 'Retrieves leads for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Leads found', type: [Inspection] }) // Assuming leads are separate entities
  @ApiResponse({ status: 404, description: 'User not found' })
  async findInspectionsByUserId(
    @Param('uid') userId: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
  ) {
    try {
      return await this.usersService.findInspectionsByUserId(
        userId,
        pagination,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'An error occurred while fetching inspections by user ID.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':uid/invoices')
  @ApiOperation({ summary: 'Retrieves invoices for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Invoices found', type: [Invoice] }) // Assuming invoices are separate entities
  @ApiResponse({ status: 404, description: 'User not found' })
  async findInvoicesByUserId(
    @Param('uid') userId: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
  ) {
    try {
      return await this.usersService.findInvoicesByUserId(userId, pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'An error occurred while fetching invoices by user ID.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':uid/clients')
  @ApiOperation({ summary: 'Retrieves clients for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Clients found', type: [Client] }) // Assuming clients are separate entities
  @ApiResponse({ status: 404, description: 'User not found' })
  async findClientsByUserId(
    @Param('uid') userId: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
  ) {
    try {
      return await this.usersService.findClientsByUserId(userId, pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'An error occurred while fetching clients by user ID.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':uid/clients-leads')
  @ApiOperation({ summary: 'Retrieves clients and leads for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Clients and leads found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findClientsAndLeadsByUserId(
    @Param('uid') userId: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
  ) {
    try {
      return await this.usersService.findClientsAndLeadsByUserId(
        userId,
        pagination,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while fetching clients and leads for the user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':uid/events')
  @ApiOperation({ summary: 'Retrieves events for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Events found', type: [Event] }) // Assuming Event is your event entity type
  @ApiResponse({ status: 404, description: 'User not found' })
  async findEventsByUserId(
    @Param('uid') userId: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
  ): Promise<Event[]> {
    try {
      return await this.usersService.findEventsByUserId(userId, pagination);
    } catch (e) {
      console.error('Error in finding events by user ID:', e);
      throw new HttpException(
        'An error occurred while fetching events for the user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':uid/tasks')
  @ApiOperation({ summary: 'Retrieves tasks for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Tasks found', type: [Task] }) // Assuming Task is your event entity type
  @ApiResponse({ status: 404, description: 'User not found' })
  async findTasksByUserId(
    @Param('uid') userId: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
  ): Promise<Task[]> {
    try {
      return await this.usersService.findTasksByUserId(userId, pagination);
    } catch (e) {
      console.error('Error in finding tasks by user ID:', e);
      throw new HttpException(
        'An error occurred while fetching tasks for the user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
