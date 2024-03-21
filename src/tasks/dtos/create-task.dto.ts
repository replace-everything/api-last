import {
  IsDate,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  @IsInt()
  tid?: number;

  @IsOptional()
  @IsInt()
  tjid?: number;

  @IsOptional()
  @IsInt()
  twoid?: number;

  @IsOptional()
  @IsInt()
  tuid?: number;

  @IsOptional()
  @IsInt()
  tassuid?: number;

  @IsOptional()
  @IsDateString()
  tdts?: string;

  @IsOptional()
  @IsDateString()
  tdeadlinedts?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8) // Validator assuming time format HH:MM:SS
  tdeadlinetime?: string;

  @IsOptional()
  @IsDate()
  topeneddts?: Date;

  @IsOptional()
  @IsDateString()
  tcompdts?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  tcat?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  tstatus?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  tpriority?: string;

  @IsOptional()
  @IsString()
  @MaxLength(48)
  tsummary?: string;

  @IsOptional()
  @IsString()
  tdetails?: string;

  @IsOptional()
  @IsString()
  treason?: string;
}
