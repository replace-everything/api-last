import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PhotoDTO } from './dto/photos.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoDTO)
    private photoRepository: Repository<PhotoDTO>,
  ) {}

  async create(createDto: CreatePhotoDto): Promise<PhotoDTO> {
    const newPhoto = this.photoRepository.create(createDto) as PhotoDTO;
    return this.photoRepository.save(newPhoto);
  }

  async findAll(): Promise<PhotoDTO[]> {
    return this.photoRepository.find();
  }

  async findOne(id: number): Promise<PhotoDTO> {
    return this.photoRepository.findOne({ where: { photoid: id } });
  }

  async update(id: number, updateDto: UpdatePhotoDto): Promise<PhotoDTO> {
    await this.photoRepository.update(id, updateDto);
    return this.photoRepository.findOne({ where: { photoid: id } });
  }

  async remove(id: number): Promise<void> {
    await this.photoRepository.delete(id);
  }
}
