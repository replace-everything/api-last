// pq-events.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class PQEventsService {
  constructor(
    @InjectRepository(Event)
    private pqEventsRepository: Repository<Event>,
  ) {}

  create(createPQEventDto: Event) {
    const pqEvent = this.pqEventsRepository.create(createPQEventDto);
    return this.pqEventsRepository.save(pqEvent);
  }

  findAll() {
    return this.pqEventsRepository.find();
  }

  findOne(id: number) {
    return this.pqEventsRepository.findOne({
      where: { eid: id },
    });
  }

  async update(id: number, updatePQEventDto: Partial<Event>) {
    await this.pqEventsRepository.update(id, updatePQEventDto);
    return this.pqEventsRepository.findOne({
      where: { eid: id },
    });
  }

  async remove(id: number) {
    await this.pqEventsRepository.delete(id);
    return { deleted: true };
  }

  async findEventsByUserAndDate(userId: number, date: Date): Promise<Event[]> {
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    return this.pqEventsRepository.find({
      where: {
        euid: userId,
        estartdts: Between(startDate, endDate),
      },
    });
  }
}
