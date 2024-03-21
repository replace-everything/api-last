import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inspection } from './entities/inspection.entity';
import { PQInspectionsController } from './inspections.controller';
import { PQInspectionsService } from './inspections.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inspection])],
  controllers: [PQInspectionsController],
  providers: [PQInspectionsService],
})
export class InspectionsModule {}
