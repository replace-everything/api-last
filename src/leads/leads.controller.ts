import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
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

@ApiTags('')
@Controller('')
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
  async findAll(
    @Query(PaginationPipe) pagination,
    @Req() req: Request,
  ): Promise<Lead[]> {
    try {
      const schema = req.user?.schema;
      return await this.leadsService.findAll(schema, pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch leads',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create a new lead' })
  @ApiResponse({
    status: 201,
    description: 'The lead has been successfully created.',
    type: Lead,
  })
  async create(
    @Body() leadData: Partial<Lead>,
    @Req() req: Request,
  ): Promise<Lead> {
    try {
      const schema = req.user?.schema;
      return await this.leadsService.create(schema, leadData);
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
  async findOne(@Param('lid') lid: number, @Req() req: Request): Promise<Lead> {
    try {
      const schema = req.user?.schema;
      return await this.leadsService.findOne(schema, lid);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch lead by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
