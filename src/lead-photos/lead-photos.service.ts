import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadPhoto } from './lead-photo.entity';

@Injectable()
export class LeadPhotosService {
  constructor(
    @InjectRepository(LeadPhoto)
    private readonly leadPhotoRepository: Repository<LeadPhoto>,
  ) {}

  async findAll(schema: string): Promise<LeadPhoto[]> {
    try {
      return await this.leadPhotoRepository.manager.query(
        `SELECT * FROM \`${schema}\`.PQ_leadPhotos;`,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch lead photos');
    }
  }

  async findOne(schema: string, id: number): Promise<LeadPhoto> {
    try {
      const [leadPhoto] = await this.leadPhotoRepository.manager.query(
        `SELECT * FROM \`${schema}\`.PQ_leadPhotos WHERE \`lpid\` = '${id}';`,
      );
      return leadPhoto;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch lead photo with ID ${id}`,
      );
    }
  }

  async create(
    schema: string,
    createLeadPhotoDto: Partial<LeadPhoto>,
  ): Promise<LeadPhoto> {
    try {
      const [newLeadPhoto] = await this.leadPhotoRepository.manager.query(
        `INSERT INTO \`${schema}\`.PQ_leadPhotos SET ? RETURNING *;`,
        [createLeadPhotoDto],
      );
      return newLeadPhoto;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create lead photo');
    }
  }

  async update(
    schema: string,
    id: number,
    updateLeadPhotoDto: Partial<LeadPhoto>,
  ): Promise<LeadPhoto> {
    try {
      await this.leadPhotoRepository.manager.query(
        `UPDATE \`${schema}\`.PQ_leadPhotos SET ? WHERE \`lpid\` = '${id}';`,
        [updateLeadPhotoDto],
      );
      return this.findOne(schema, id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update lead photo with ID ${id}`,
      );
    }
  }

  async remove(schema: string, id: number): Promise<void> {
    try {
      await this.leadPhotoRepository.manager.query(
        `DELETE FROM \`${schema}\`.PQ_leadPhotos WHERE \`lpid\` = '${id}';`,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete lead photo with ID ${id}`,
      );
    }
  }
}
