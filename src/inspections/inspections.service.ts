import { Injectable } from '@nestjs/common';
import {
  CreatePQInspectionDto,
  UpdatePQInspectionDto,
} from './dtos/inspection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inspection } from './entities/inspection.entity';

@Injectable()
export class PQInspectionsService {
  constructor(
    @InjectRepository(Inspection)
    private readonly PQInspectionsRepository: Repository<Inspection>,
  ) {}

  create(createPQInspectionDto: CreatePQInspectionDto) {
    const PQInspection = this.PQInspectionsRepository.create(
      createPQInspectionDto,
    );
    return this.PQInspectionsRepository.save(PQInspection);
  }

  findAll() {
    return this.PQInspectionsRepository.find();
  }

  findOne(id: number) {
    return this.PQInspectionsRepository.findOne({
      where: { inid: id },
    });
  }

  async update(id: number, updatePQInspectionDto: UpdatePQInspectionDto) {
    await this.PQInspectionsRepository.update(id, updatePQInspectionDto);
    return this.PQInspectionsRepository.findOne({
      where: { inid: id },
    });
  }

  remove(id: number) {
    return this.PQInspectionsRepository.delete(id);
  }
}
