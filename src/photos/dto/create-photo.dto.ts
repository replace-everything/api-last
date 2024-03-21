import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsOptional()
  @IsInt()
  pjobid?: number | null;

  @IsOptional()
  @IsInt()
  pwoid?: number | null;

  @IsOptional()
  @IsString()
  pwotype?: string | null;

  @IsOptional()
  @IsString()
  puser?: string | null;

  @IsString()
  photoname: string; // Assuming this is a file name

  @IsString()
  photoext: string;

  @IsOptional()
  @IsDateString()
  photodts?: Date | null;

  @IsOptional()
  @IsString()
  photolabel?: string | null;

  @IsOptional()
  @IsString()
  phototags?: string | null;

  @IsOptional()
  @IsInt()
  photoorder?: number | null;
}
