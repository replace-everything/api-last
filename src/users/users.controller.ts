import {
  Controller,
  Get,
  Query,
  Param,
  Req,
  Put,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaginationPipe } from '../common/pipes/pagination.pipe';
import { User } from '../users/entities/user.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Event } from '../events/entities/event.entity';
import { Inspection } from '../inspections/entities/inspection.entity';
import { Client } from '../clients/entities/client.entity';
import { Task } from '../tasks/entities/task.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ModuleRef } from '@nestjs/core';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.usersService = this.moduleRef.get(UsersService, { strict: true });
  }

  @Put('/:uid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    type: User,
  })
  async updateUser(
    @Param('uid') uid: number,
    @Body() updateUserDto: Partial<User>,
    @Req() req,
  ) {
    const schema = req.user?.schema;
    return await this.usersService.updateUser(uid, updateUserDto, schema);
  }

  @Delete('/:uid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  async deleteUser(@Param('uid') uid: number, @Req() req) {
    const schema = req.user?.schema;
    return await this.usersService.deleteUser(uid, schema);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieves a paginated list of users' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Users retrieved', type: [User] })
  async findAll(
    @Query(PaginationPipe) pagination: PaginationPipe,
    @Req() req,
  ): Promise<User[]> {
    const schema = req.user?.schema;
    return await this.usersService.findAll(schema, pagination);
  }

  @Get('/:uid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Finds a single user by ID' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  async findOne(@Param('uid') uid: number, @Req() req): Promise<User> {
    const schema = req.user?.schema;
    return await this.usersService.findOne(schema, uid);
  }

  @Get('/:uid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Finds a single user by ID' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  async findOne(@Param('uid') uid: number, @Req() req): Promise<User> {
    const schema = req.user?.schema;
    return await this.usersService.findOne(schema, uid);
  }

  @Get('/:uid/leads')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieves leads for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Leads found', type: [Lead] })
  async findLeadsByUserId(
    @Param('uid') uid: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
    @Req() req,
  ): Promise<Lead[]> {
    const schema = req.user?.schema;
    return await this.usersService.findLeadsByUserId(schema, uid, pagination);
  }

  @Get('/:uid/inspections')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieves inspections for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({
    status: 200,
    description: 'Inspections found',
    type: [Inspection],
  })
  async findInspectionsByUserId(
    @Param('uid') uid: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
    @Req() req,
  ): Promise<Inspection[]> {
    const schema = req.user?.schema;
    return await this.usersService.findInspectionsByUserId(
      schema,
      uid,
      pagination,
    );
  }

  @Get('/:uid/invoices')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieves invoices for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Invoices found', type: [Invoice] })
  async findInvoicesByUserId(
    @Param('uid') uid: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
    @Req() req,
  ): Promise<Invoice[]> {
    const schema = req.user?.schema;
    return await this.usersService.findInvoicesByUserId(
      schema,
      uid,
      pagination,
    );
  }

  @Get('/:uid/clients')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieves clients for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Clients found', type: [Client] })
  async findClientsByUserId(
    @Param('uid') uid: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
    @Req() req,
  ): Promise<Client[]> {
    const schema = req.user?.schema;
    return await this.usersService.findClientsByUserId(schema, uid, pagination);
  }

  @Get('/:uid/events')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieves events for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Events found', type: [Event] })
  async findEventsByUserId(
    @Param('uid') uid: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
    @Req() req,
  ): Promise<Event[]> {
    const schema = req.user?.schema;
    return await this.usersService.findEventsByUserId(schema, uid, pagination);
  }

  @Get('/:uid/tasks')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieves tasks for a specific user' })
  @ApiParam({ name: 'uid', description: 'The unique ID of the user' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Tasks found', type: [Task] })
  async findTasksByUserId(
    @Param('uid') uid: number,
    @Query(PaginationPipe) pagination: PaginationPipe,
    @Req() req,
  ): Promise<Task[]> {
    const schema = req.user?.schema;
    return await this.usersService.findTasksByUserId(schema, uid, pagination);
  }

  @Get('/search')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Search users by partial or full name' })
  @ApiQuery({
    name: 'query',
    required: true,
    description: 'Partial or full first name, last name, or full name',
  })
  @ApiResponse({ status: 200, description: 'Search results', type: [User] })
  async searchUsers(
    @Query('query') query: string,
    @Req() req,
  ): Promise<User[]> {
    const schema = req.user?.schema;
    return await this.usersService.searchByName(schema, query);
  }
}
