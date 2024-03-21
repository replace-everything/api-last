import { Controller, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PhotosService } from './photos.service';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { ModuleRef, OnModuleInit } from '@nestjs/core';

@ApiTags('')
@Controller('')
export class PhotosController implements OnModuleInit {
  private photosService: PhotosService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.photosService = this.moduleRef.get(PhotosService, { strict: false });
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all photos' })
  @ApiResponse({
    status: 200,
    description: 'An array of photos',
    type: [Photo],
  }) // Adjust 'Photo' type if needed
  findAll() {
    return this.photosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a photo by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the photo' })
  @ApiResponse({ status: 200, description: 'The photo object', type: Photo })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a photo' })
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the photo' })
  @ApiResponse({
    status: 200,
    description: 'Updated photo object',
    type: Photo,
  })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  update(@Param('id') id: string, @Body() updateDto: UpdatePhotoDto) {
    return this.photosService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a photo' })
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the photo' })
  @ApiResponse({ status: 204, description: 'Photo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  remove(@Param('id') id: string) {
    return this.photosService.remove(+id);
  }
}
