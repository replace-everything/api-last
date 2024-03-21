import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class PQEventsService {
  constructor(
    @InjectRepository(Event)
    private readonly pqEventsRepository: Repository<Event>,
  ) {}

  async create(schema: string, createPQEventDto: Event): Promise<Event> {
    try {
      const pqEvent = this.pqEventsRepository.create(createPQEventDto);
      return await this.pqEventsRepository.manager.save(
        `${schema}.PQ_events`,
        pqEvent,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to create event');
    }
  }

  async findAll(schema: string): Promise<Event[]> {
    try {
      return await this.pqEventsRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_events;`,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch events');
    }
  }

  async findOne(schema: string, id: number): Promise<Event> {
    try {
      const [event] = await this.pqEventsRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_events WHERE eid = '${id}';`,
      );
      return event;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch event');
    }
  }

  private escapeSQLString(value) {
    if (typeof value === 'string') {
      // Simple escape for single quotes - this is a naive approach, be very cautious!
      return `'${value.replace(/'/g, "''")}'`;
    }
    return value;
  }

  async update(
    schema: string,
    id: number,
    updatePQEventDto: Partial<Event>,
  ): Promise<Event> {
    try {
      const setClause = Object.entries(updatePQEventDto)
        .map(([key, value]) => `"${key}" = ${this.escapeSQLString(value)}`)
        .join(', ');
      await this.pqEventsRepository.manager.query(
        `UPDATE ${schema}.PQ_events SET ${setClause} WHERE eid = '${id}' returning *;`,
      );
      return this.findOne(schema, id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update event');
    }
  }

  async remove(schema: string, id: number): Promise<{ deleted: true }> {
    try {
      await this.pqEventsRepository.manager.query(
        `DELETE FROM ${schema}.PQ_events WHERE eid = '${id}';`,
      );
      return { deleted: true };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete event');
    }
  }

  async findEventsByUserAndDate(
    schema: string,
    userId: number,
    date: Date,
  ): Promise<Event[]> {
    try {
      const startDate = new Date(date.setHours(0, 0, 0, 0));
      const endDate = new Date(date.setHours(23, 59, 59, 999));
      return await this.pqEventsRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_events WHERE euid = ${userId} AND estartdts BETWEEN ${startDate} AND ${endDate};`,
        [userId, startDate, endDate],
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find events by user and date',
      );
    }
  }
}
