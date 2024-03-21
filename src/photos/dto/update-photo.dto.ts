import { IsInt, IsOptional } from 'class-validator';
import { CreatePhotoDto } from './create-photo.dto';

export class UpdatePhotoDto extends CreatePhotoDto {
  @IsOptional()
  @IsInt()
  photoid?: number;

  // Other fields are inherited as optional from CreatePhotoDto
}
