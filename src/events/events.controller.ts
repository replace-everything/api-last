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
  HttpException,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PQEventsService } from './events.service';
import { Event } from './entities/event.entity';

@ApiTags('')
@Controller('')
export class PQEventController implements OnModuleInit {
  private pqEventsService: PQEventsService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.pqEventsService = this.moduleRef.get(PQEventsService, {
      strict: false,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new PQ event' })
  @ApiResponse({ status: 201, description: 'Event created', type: Event })
  async create(@Req() req: Request, @Body() createPQEventDto: Event) {
    try {
      const schema = req.user?.schema;
      return await this.pqEventsService.create(schema, createPQEventDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all PQ events' })
  @ApiResponse({ status: 200, description: 'Array of events', type: [Event] })
  async findAll(@Req() req: Request) {
    try {
      const schema = req.user?.schema;
      return await this.pqEventsService.findAll(schema);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch events',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a PQ event by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Event object', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async findOne(@Req() req: Request, @Param('id') id: string) {
    try {
      const schema = req.user?.schema;
      return await this.pqEventsService.findOne(schema, +id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch event by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a PQ event' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Event updated', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatePQEventDto: Partial<Event>,
  ) {
    try {
      const schema = req.user?.schema;
      return await this.pqEventsService.update(schema, +id, updatePQEventDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to update event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a PQ event' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 204, description: 'Event deleted' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async remove(@Req() req: Request, @Param('id') id: string) {
    try {
      const schema = req.user?.schema;
      return await this.pqEventsService.remove(schema, +id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:userId/date')
  @ApiOperation({ summary: 'Get events by user ID and date' })
  @ApiQuery({ name: 'userId', type: 'number' })
  @ApiQuery({ name: 'date', type: 'string' })
  @ApiResponse({ status: 200, description: 'Array of events', type: [Event] })
  async getEventsByUserAndDate(
    @Req() req: Request,
    @Query('userId', ParseIntPipe) userId: number,
    @Query('date') dateString: string,
  ): Promise<Event[]> {
    try {
      const schema = req.user?.schema;
      const date = new Date(dateString);
      return await this.pqEventsService.findEventsByUserAndDate(
        schema,
        userId,
        date,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch events by user ID and date',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
