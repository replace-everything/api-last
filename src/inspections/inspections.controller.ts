import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreatePQInspectionDto } from './dtos/inspection.dto';
import { PQInspectionsService } from './inspections.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Inspection } from './entities/inspection.entity';
import { ModuleRef } from '@nestjs/core';

@ApiTags('')
@Controller('')
export class PQInspectionsController implements OnModuleInit {
  private pQInspectionsService: PQInspectionsService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.pQInspectionsService = this.moduleRef.get(PQInspectionsService, {
      strict: false,
    });
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create a new PQ inspection' })
  @ApiResponse({
    status: 201,
    description: 'The inspection has been successfully created.',
    type: CreatePQInspectionDto,
  })
  async create(
    @Req() req: Request,
    @Body() createPQInspectionDto: Partial<Inspection>,
  ) {
    try {
      const schema = req.user?.schema;
      return await this.pQInspectionsService.create(
        schema,
        createPQInspectionDto,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create inspection',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all PQ inspections' })
  @ApiResponse({
    status: 200,
    description: 'An array of PQ inspection objects',
    type: [Inspection],
  })
  async findAll(@Req() req: Request) {
    try {
      const schema = req.user?.schema;
      return await this.pQInspectionsService.findAll(schema);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch inspections',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a PQ inspection by its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The numeric ID of the inspection',
  })
  @ApiResponse({
    status: 200,
    description: 'The PQ inspection object',
    type: Inspection,
  })
  @ApiResponse({
    status: 404,
    description: 'Inspection with the specified ID not found',
  })
  async findOne(@Req() req: Request, @Param('id') id: number) {
    try {
      const schema = req.user?.schema;
      return await this.pQInspectionsService.findOne(schema, id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch inspection by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing PQ inspection' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The numeric ID of the inspection to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated PQ inspection object',
  })
  @ApiResponse({
    status: 404,
    description: 'Inspection with the specified ID not found',
  })
  async update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() updatePQInspectionDto: Partial<Inspection>,
  ) {
    try {
      const schema = req.user?.schema;
      return await this.pQInspectionsService.update(
        schema,
        +id,
        updatePQInspectionDto,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to update inspection',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a PQ inspection' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The numeric ID of the inspection to delete',
  })
  @ApiResponse({ status: 204, description: 'Inspection successfully deleted' })
  @ApiResponse({
    status: 404,
    description: 'Inspection with the specified ID not found',
  })
  async remove(@Req() req: Request, @Param('id') id: number) {
    try {
      const schema = req.user?.schema;
      return await this.pQInspectionsService.remove(schema, id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete inspection',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
