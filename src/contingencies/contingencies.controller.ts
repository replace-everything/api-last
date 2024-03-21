import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Put,
  Delete,
  OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ContingencyService } from './contingencies.service';
import { Contingency } from './contingency.entity';
import { FastifyRequest } from 'fastify';

@ApiTags('')
@Controller('')
export class ContingencyController implements OnModuleInit {
  private contingencyService: ContingencyService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.contingencyService = this.moduleRef.get(ContingencyService, {
      strict: false,
    });
  }

  @Get()
  @ApiOperation({ summary: 'List all contingencies' })
  @ApiResponse({ status: 200, description: 'Return all contingencies.' })
  findAll(@Req() req: FastifyRequest): Promise<Contingency[]> {
    const schema = req.user?.schema;
    return this.contingencyService.findAll(schema);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contingency by id' })
  @ApiResponse({ status: 200, description: 'Return a single contingency.' })
  findOne(
    @Param('id') id: number,
    @Req() req: FastifyRequest,
  ): Promise<Contingency> {
    const schema = req.user?.schema;
    return this.contingencyService.findOne(schema, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new contingency' })
  @ApiResponse({
    status: 201,
    description: 'The contingency has been successfully created.',
  })
  create(
    @Body() contingencyData: Partial<Contingency>,
    @Req() req: FastifyRequest,
  ): Promise<Contingency> {
    const schema = req.user?.schema;
    return this.contingencyService.create(schema, contingencyData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a contingency' })
  @ApiResponse({
    status: 200,
    description: 'The contingency has been successfully updated.',
  })
  update(
    @Param('id') id: number,
    @Body() contingencyData: Partial<Contingency>,
    @Req() req: FastifyRequest,
  ): Promise<Contingency> {
    const schema = req.user?.schema;
    return this.contingencyService.update(schema, id, contingencyData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contingency' })
  @ApiResponse({
    status: 200,
    description: 'The contingency has been successfully deleted.',
  })
  remove(@Param('id') id: number, @Req() req: FastifyRequest): Promise<void> {
    const schema = req.user?.schema;
    return this.contingencyService.remove(schema, id);
  }
}
