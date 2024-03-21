import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreatePQInspectionDto,
  UpdatePQInspectionDto,
} from './dtos/inspection.dto';
import { PQInspectionsService } from './inspections.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('inspections')
@Controller('inspections')
export class PQInspectionsController {
  constructor(private readonly pQInspectionsService: PQInspectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new PQ inspection' })
  @ApiResponse({
    status: 201,
    description: 'The inspection has been successfully created.',
    type: CreatePQInspectionDto,
  })
  async create(@Body() createPQInspectionDto: CreatePQInspectionDto) {
    try {
      return await this.pQInspectionsService.create(createPQInspectionDto);
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
    type: [CreatePQInspectionDto],
  })
  async findAll() {
    try {
      return await this.pQInspectionsService.findAll();
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
    type: CreatePQInspectionDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Inspection with the specified ID not found',
  })
  async findOne(@Param('id') id: number) {
    try {
      return await this.pQInspectionsService.findOne(id);
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
    type: CreatePQInspectionDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Inspection with the specified ID not found',
  })
  async update(
    @Param('id') id: number,
    @Body() updatePQInspectionDto: UpdatePQInspectionDto,
  ) {
    try {
      return await this.pQInspectionsService.update(+id, updatePQInspectionDto);
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
  async remove(@Param('id') id: number) {
    try {
      return await this.pQInspectionsService.remove(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete inspection',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
