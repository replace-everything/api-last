import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class PQLeadsDto {
  @IsNumber()
  lid: number = 0;

  @IsNumber()
  @IsOptional()
  luid?: number;

  @IsNumber()
  @IsOptional()
  lcid?: number;

  @IsDate()
  @IsOptional()
  ladate?: Date;

  @IsString()
  @IsOptional()
  lstatus?: string;

  @IsString()
  @IsOptional()
  lstatus2?: string;

  @IsString()
  @IsOptional()
  ltype?: string;

  @IsString()
  @IsOptional()
  lservice?: string;

  @IsNumber()
  @IsOptional()
  lstatusuid?: number;

  @IsString()
  @IsOptional()
  lstatusreason?: string;

  @IsDate()
  @IsOptional()
  lstatusdate?: Date;

  @IsDate()
  @IsOptional()
  llastcontact?: Date;

  @IsNumber()
  @IsOptional()
  llastcontactuid?: number;

  @IsString()
  @IsOptional()
  lsource?: string;

  @IsString()
  @IsOptional()
  lcomp?: string;

  @IsString()
  @IsOptional()
  lcontact?: string;

  @IsString()
  @IsOptional()
  ltitle?: string;

  @IsString()
  @IsOptional()
  llname?: string;

  @IsString()
  @IsOptional()
  laddr1?: string;

  @IsString()
  @IsOptional()
  laddr2?: string;

  @IsString()
  @IsOptional()
  lcity?: string;

  @IsString()
  @IsOptional()
  lst?: string;

  @IsNumber()
  @IsOptional()
  lzip?: number;

  @IsString()
  @IsOptional()
  llatlon?: string;

  @IsString()
  @IsOptional()
  lphone?: string;

  @IsString()
  @IsOptional()
  lext?: string;

  @IsString()
  @IsOptional()
  laltphone?: string;

  @IsString()
  @IsOptional()
  laltext?: string;

  @IsString()
  @IsOptional()
  lemail?: string;

  @IsNumber()
  @IsOptional()
  llotid?: number;

  @IsString()
  @IsOptional()
  lnotes?: string;

  @IsString()
  @IsOptional()
  lfax?: string;

  @IsString()
  @IsOptional()
  lcontact2?: string;

  @IsString()
  @IsOptional()
  ltitle2?: string;

  @IsNumber()
  @IsOptional()
  lphone2?: number;

  @IsString()
  @IsOptional()
  lext2?: string;

  @IsString()
  @IsOptional()
  lemail2?: string;

  @IsString()
  @IsOptional()
  lemail2cc?: string;

  @IsString()
  @IsOptional()
  lbtype?: string;

  @IsNumber()
  @IsOptional()
  lbfloors?: number;

  @IsString()
  @IsOptional()
  lbroofmat?: string;

  @IsString()
  @IsOptional()
  lbhatch?: string;

  @IsNumber()
  @IsOptional()
  lbheight?: number;

  @IsDate()
  @IsOptional()
  linspection?: Date;

  @IsDate()
  @IsOptional()
  linspectioncomp?: Date;

  @IsString()
  @IsOptional()
  linspectionnotes?: string;

  @IsString()
  @IsOptional()
  llocnotes?: string;

  @IsNumber()
  @IsOptional()
  lapp?: number;

  @IsString()
  @IsOptional()
  linvpays?: string;

  @IsString()
  @IsOptional()
  linsuranceco?: string;

  @IsString()
  @IsOptional()
  lclaimnum?: string;

  @IsString()
  @IsOptional()
  lsimpleinspections?: string;
}
