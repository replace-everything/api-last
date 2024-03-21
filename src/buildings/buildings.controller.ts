import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
  OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BuildingService } from './buildings.service';
import { Building } from './entities/building.entity';

@ApiTags('')
@Controller('')
export class BuildingController implements OnModuleInit {
  private buildingService: BuildingService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.buildingService = this.moduleRef.get(BuildingService, {
      strict: false,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve all buildings' })
  @ApiResponse({
    status: 200,
    description: 'List of buildings',
    type: [Building],
  })
  findAll(@Req() req: FastifyRequest): Promise<Building[]> {
    const schema = req.user?.schema;
    return this.buildingService.findAll(schema);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a building by id' })
  @ApiParam({ name: 'id', description: 'Building ID' })
  @ApiResponse({ status: 200, description: 'Building details', type: Building })
  @ApiResponse({ status: 404, description: 'Building not found' })
  findOne(
    @Param('id') id: string,
    @Req() req: FastifyRequest,
  ): Promise<Building> {
    const schema = req.user?.schema;
    return this.buildingService.findOne(schema, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create a new building' })
  @ApiBody({ type: Building, description: 'Building data' })
  @ApiResponse({
    status: 201,
    description: 'The building has been successfully created.',
    type: Building,
  })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body() building: Building,
    @Req() req: FastifyRequest,
  ): Promise<Building> {
    const schema = req.user?.schema;
    return this.buildingService.create(schema, building);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a building' })
  @ApiParam({ name: 'id', description: 'Building ID' })
  @ApiBody({ type: Building, description: 'Updated building data' })
  @ApiResponse({
    status: 200,
    description: 'The building has been successfully updated.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 404, description: 'Building not found' })
  update(
    @Param('id') id: string,
    @Body() building: Building,
    @Req() req: FastifyRequest,
  ): Promise<void> {
    const schema = req.user?.schema;
    return this.buildingService.update(schema, +id, building);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a building' })
  @ApiParam({ name: 'id', description: 'Building ID' })
  @ApiResponse({
    status: 200,
    description: 'The building has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Building not found' })
  remove(@Param('id') id: string, @Req() req: FastifyRequest): Promise<void> {
    const schema = req.user?.schema;
    return this.buildingService.remove(schema, +id);
  }
}
