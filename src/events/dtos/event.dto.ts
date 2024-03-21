// event.dto.ts
import {
  IsOptional,
  IsInt,
  IsString,
  IsDate,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EventDto {
  @IsOptional()
  @IsInt()
  euid?: number;

  @IsOptional()
  @IsInt()
  ejid?: number;

  @IsOptional()
  @IsInt()
  ecid?: number;

  @IsOptional()
  @IsInt()
  elid?: number;

  @IsOptional()
  @IsInt()
  elocid?: number;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  etype?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  estartdts?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  eenddts?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  eallday?: string;

  @IsOptional()
  @IsString()
  @MaxLength(84)
  etitle?: string;

  @IsOptional()
  @IsString()
  edesc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  estatus?: string;

  @IsOptional()
  @IsInt()
  eauid?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  eadts?: Date;

  @IsOptional()
  @IsInt()
  eduration?: number;

  @IsOptional()
  @IsString()
  @MaxLength(6)
  edurationtyp?: string;

  @IsOptional()
  @IsEmail({}, { each: true })
  notify_emails?: string[];

  @IsOptional()
  @IsString({ each: true })
  notify_names?: string[];
}
