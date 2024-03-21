import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './../config/database-config.service';
import { Photo } from './entities/photo.entity'; // Assuming you have an entity class for photos
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { PhotoDTO } from './dto/photos.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, PhotoDTO])], // Import TypeOrmModule here
  controllers: [PhotosController],
  providers: [PhotosService, DatabaseConfigService], // Add DatabaseConfigService here
})
export class PhotosModule {}
