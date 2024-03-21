// clients.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreatePQClientDto, UpdatePQClientDto } from './dtos/client.dto';

@Injectable()
export class PQClientService {
  constructor(
    @InjectRepository(Client)
    private pqClientRepository: Repository<Client>,
  ) {}

  create(createPQClientDto: CreatePQClientDto): Promise<Client> {
    const pqClient = this.pqClientRepository.create(createPQClientDto);
    return this.pqClientRepository.save(pqClient);
  }

  findAll(): Promise<Client[]> {
    return this.pqClientRepository.find();
  }

  findOne(id: number): Promise<Client> {
    return this.pqClientRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updatePQClientDto: UpdatePQClientDto,
  ): Promise<Client> {
    await this.pqClientRepository.update(id, updatePQClientDto);
    return this.pqClientRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.pqClientRepository.delete(id);
  }
}
