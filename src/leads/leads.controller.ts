import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaginationPipe } from '../common/pipes/pagination.pipe';
import { Lead } from './entities/lead.entity';
import { LeadsService } from './leads.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateLeadDto } from './dtos/create-lead.dto';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(public readonly leadsService: LeadsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Retrieve a paginated list of leads' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of leads',
    type: [Lead],
  })
  async findAll(@Query(PaginationPipe) pagination): Promise<Lead[]> {
    try {
      return await this.leadsService.findAll(pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch leads',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a new lead' })
  @ApiResponse({
    status: 201,
    description: 'The lead has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() leadData: CreateLeadDto): Promise<Lead> {
    try {
      return await this.leadsService.create(leadData);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create lead',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':lid')
  @ApiOperation({ summary: 'Fetch a single lead by its ID' })
  @ApiParam({ name: 'lid', type: 'number', description: 'The ID of the lead' })
  @ApiResponse({ status: 200, description: 'The requested lead', type: Lead })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  async findOne(@Param('lid') lid: number): Promise<Lead> {
    try {
      return await this.leadsService.findOne(lid);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch lead by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Fetch leads associated with a specific user' })
  @ApiParam({
    name: 'userId',
    type: 'number',
    description: 'The ID of the user',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of leads for the user',
    type: [Lead],
  })
  async getLeadsByUserId(
    @Param('userId') userId: number,
    @Query(PaginationPipe) pagination,
  ): Promise<Lead[]> {
    try {
      return await this.leadsService.getLeadsByUid(userId, pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch leads for user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
