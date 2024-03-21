import { IsInt, IsString, IsOptional } from 'class-validator';

export class PQInstallerPhotosDTO {
  @IsInt()
  jrpiid: number;

  @IsOptional()
  @IsInt()
  jrpijrid?: number;

  @IsInt()
  jrpiorder: number;

  @IsOptional()
  @IsString()
  jrpifilename?: string;
}
