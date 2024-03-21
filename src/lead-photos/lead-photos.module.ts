import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadPhotosService } from './lead-photos.service';
import { LeadPhotosController } from './lead-photos.controller';
import { LeadPhoto } from './lead-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeadPhoto])],
  providers: [LeadPhotosService],
  controllers: [LeadPhotosController],
})
export class LeadPhotoModule {}
