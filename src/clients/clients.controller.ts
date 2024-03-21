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
  Req,
  UseGuards,
  OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PQClientService } from './clients.service';
import { CreatePQClientDto } from './dtos/client.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Client } from './entities/client.entity';
import { DeepPartial } from 'typeorm';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('')
@Controller('')
export class PQClientController implements OnModuleInit {
  constructor(
    private pqClientService: PQClientService,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.pqClientService = this.moduleRef.get(PQClientService, {
      strict: true,
    });
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new PQ client' })
  @ApiBody({ type: CreatePQClientDto })
  @ApiResponse({ status: 201, description: 'Client created', type: Client })
  async create(@Req() req, @Body() createPQClientDto: DeepPartial<Client>) {
    try {
      const schema = req.user?.schema;
      return await this.pqClientService.create(schema, createPQClientDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve all PQ clients' })
  @ApiResponse({ status: 200, description: 'Array of clients', type: [Client] })
  async findAll(@Req() req) {
    try {
      console.log('Inside findAll controller method');
      const pqClientService = req['service'];

      const unloadedModule = req['module'];
      if (unloadedModule) {
        console.log('Loaded Module:', unloadedModule);
        console.log('REQ MODULE', req['module']);
        console.log('REQ', req);
        const pqClientService = unloadedModule.get(PQClientService);
        console.log('PQClientService:', pqClientService);
        console.log(
          '\n\n\n\n\nPQClientService',
          this.pqClientService,
          '\n\n\n\n\n\n\n',
        );
        const schema = req.user?.schema;
        return await pqClientService.findAll(schema);
      } else {
        throw new Error('Module not loaded');
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch clients',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a PQ client by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Client object', type: Client })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findOne(@Req() req, @Param('id') id: string) {
    try {
      const schema = req.user?.schema;
      return await this.pqClientService.findOne(schema, +id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch client by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a PQ client' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Client updated', type: Client })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updatePQClientDto: DeepPartial<Client>,
  ) {
    try {
      const schema = req.user?.schema;
      return await this.pqClientService.update(schema, +id, updatePQClientDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to update client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a PQ client' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 204, description: 'Client deleted' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async remove(@Req() req, @Param('id') id: string) {
    try {
      const schema = req.user?.schema;
      return await this.pqClientService.remove(schema, +id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
