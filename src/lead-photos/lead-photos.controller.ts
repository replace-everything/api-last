import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { LeadPhotosService } from './lead-photos.service';
import { LeadPhoto } from './lead-photo.entity';
import { ModuleRef, OnModuleInit } from '@nestjs/core';

@ApiTags('')
@Controller('')
export class LeadPhotosController implements OnModuleInit {
  private leadPhotosService: LeadPhotosService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.leadPhotosService = this.moduleRef.get(LeadPhotosService, {
      strict: false,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all lead photos' })
  @ApiResponse({
    status: 200,
    description: 'Return all lead photos.',
    type: [LeadPhoto],
  })
  findAll(@Req() req: FastifyRequest): Promise<LeadPhoto[]> {
    const schema = req.user?.schema;
    return this.leadPhotosService.findAll(schema);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lead photo by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Lead Photo ID' })
  @ApiResponse({
    status: 200,
    description: 'Return a single lead photo.',
    type: LeadPhoto,
  })
  findOne(
    @Param('id') id: number,
    @Req() req: FastifyRequest,
  ): Promise<LeadPhoto> {
    const schema = req.user?.schema;
    return this.leadPhotosService.findOne(schema, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new lead photo' })
  @ApiBody({ description: 'Lead Photo Data' })
  @ApiResponse({
    status: 201,
    description: 'The lead photo has been successfully created.',
    type: LeadPhoto,
  })
  create(
    @Body() createLeadPhotoDto: Partial<LeadPhoto>,
    @Req() req: FastifyRequest,
  ): Promise<LeadPhoto> {
    const schema = req.user?.schema;
    return this.leadPhotosService.create(schema, createLeadPhotoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a lead photo' })
  @ApiParam({ name: 'id', required: true, description: 'Lead Photo ID' })
  @ApiBody({ description: 'Updated Lead Photo Data' })
  @ApiResponse({
    status: 200,
    description: 'The lead photo has been successfully updated.',
    type: LeadPhoto,
  })
  update(
    @Param('id') id: number,
    @Body() updateLeadPhotoDto: Partial<LeadPhoto>,
    @Req() req: FastifyRequest,
  ): Promise<LeadPhoto> {
    const schema = req.user?.schema;
    return this.leadPhotosService.update(schema, id, updateLeadPhotoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lead photo' })
  @ApiParam({ name: 'id', required: true, description: 'Lead Photo ID' })
  @ApiResponse({
    status: 200,
    description: 'The lead photo has been successfully deleted.',
  })
  remove(@Param('id') id: number, @Req() req: FastifyRequest): Promise<void> {
    const schema = req.user?.schema;
    return this.leadPhotosService.remove(schema, id);
  }
}
