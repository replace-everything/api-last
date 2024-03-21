import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PQClientService } from './clients.service';
import { CreatePQClientDto, UpdatePQClientDto } from './dtos/client.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Client } from './entities/client.entity';

@ApiTags('clients')
@Controller('clients')
export class PQClientController {
  constructor(private readonly pqClientService: PQClientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new PQ client' })
  @ApiBody({ type: CreatePQClientDto })
  @ApiResponse({ status: 201, description: 'Client created', type: Client })
  async create(@Body() createPQClientDto: CreatePQClientDto) {
    try {
      return await this.pqClientService.create(createPQClientDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all PQ clients' })
  @ApiResponse({ status: 200, description: 'Array of clients', type: [Client] })
  async findAll() {
    try {
      return await this.pqClientService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch clients',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a PQ client by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Client object', type: Client })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.pqClientService.findOne(+id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch client by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a PQ client' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdatePQClientDto })
  @ApiResponse({ status: 200, description: 'Client updated', type: Client })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async update(
    @Param('id') id: string,
    @Body() updatePQClientDto: UpdatePQClientDto,
  ) {
    try {
      return await this.pqClientService.update(+id, updatePQClientDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to update client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a PQ client' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 204, description: 'Client deleted' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async remove(@Param('id') id: string) {
    try {
      return await this.pqClientService.remove(+id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
