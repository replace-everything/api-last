import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePQInspectionDto {
  @IsOptional()
  @IsInt()
  inid: number;

  @IsOptional()
  @IsInt()
  inlid: number;

  @IsOptional()
  @IsInt()
  inbid: number;

  @IsOptional()
  @IsInt()
  incid: number;

  @IsOptional()
  @IsInt()
  injid: number;

  @IsOptional()
  @IsInt()
  inlotid: number;

  @IsOptional()
  @IsDate()
  indts: Date;

  @IsOptional()
  @IsInt()
  incomsalesid: number;

  @IsOptional()
  @IsDate()
  incomdts: Date;

  @IsOptional()
  @IsString()
  incomkey: string;

  @IsOptional()
  @IsString()
  incomshow: string;

  @IsOptional()
  @IsString()
  insimpleinspections: string;

  @IsOptional()
  @IsString()
  inservices: string;

  @IsOptional()
  @IsInt()
  inprojectidcc: bigint;

  @IsOptional()
  @IsString()
  inurlappcc: string;

  @IsOptional()
  @IsString()
  inurlpubcc: string;

  @IsOptional()
  @IsString()
  inurlprojcc: string;
}

export class UpdatePQInspectionDto extends CreatePQInspectionDto {}
