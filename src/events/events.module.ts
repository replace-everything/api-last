import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { PQEventController } from './events.controller';
import { PQEventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [PQEventController],
  providers: [PQEventsService],
})
export class EventsModule {}
