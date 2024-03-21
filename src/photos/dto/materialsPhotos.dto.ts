import { IsInt, IsOptional, IsString } from 'class-validator';

export class PQMaterialsPhotosDTO {
  @IsInt()
  mpid: number;

  @IsOptional()
  @IsInt()
  mpmid?: number;

  @IsOptional()
  @IsString()
  mplabel?: string;

  @IsOptional()
  @IsString()
  mpfn?: string;
}
