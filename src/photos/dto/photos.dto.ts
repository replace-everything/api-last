import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class PhotoDTO {
  @IsInt()
  photoid: number;

  @IsOptional()
  @IsInt()
  pjobid?: number;

  @IsOptional()
  @IsInt()
  pwoid?: number;

  @IsOptional()
  @IsString()
  pwotype?: string;

  @IsOptional()
  @IsString()
  puser?: string;

  @IsOptional()
  @IsInt()
  photoname?: string;

  @IsOptional()
  @IsString()
  photoext?: string;

  @IsOptional()
  @IsDate()
  photodts?: Date;

  @IsOptional()
  @IsString()
  photolabel?: string;

  @IsOptional()
  @IsString()
  phototags?: string;

  @IsOptional()
  @IsInt()
  photoorder: number;
}
