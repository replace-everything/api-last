import {
  IsOptional,
  IsString,
  IsEmail,
  IsNumber,
  IsDate,
  IsInt,
  IsArray,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  ulogin?: string;

  @IsOptional()
  @IsString()
  upass?: string;

  @IsOptional()
  @IsString()
  ufirstn?: string;

  @IsOptional()
  @IsString()
  ulastn?: string;

  @IsOptional()
  @IsEmail()
  uemail?: string;

  @IsOptional()
  @IsString()
  uphone?: string;

  @IsOptional()
  @IsString()
  uphonemobile?: string;

  @IsOptional()
  @IsDate()
  uadddts?: Date;

  @IsOptional()
  @IsNumber()
  uaddid?: number;

  @IsOptional()
  @IsDate()
  ueditdts?: Date;

  @IsOptional()
  @IsNumber()
  ueditid?: number;

  @IsOptional()
  @IsDate()
  ulastlogin?: Date;

  @IsOptional()
  @IsDate()
  ulastdts?: Date;

  @IsOptional()
  @IsDate()
  ulastpassdts?: Date;

  @IsOptional()
  @IsString()
  ustatus?: string;

  @IsOptional()
  @IsDate()
  uexpire?: Date;

  @IsOptional()
  @IsString()
  ucolor?: string;

  @IsOptional()
  @IsString()
  ukey?: string;

  @IsOptional()
  @IsString()
  uperms?: string;

  @IsOptional()
  @IsString()
  ustart?: string;

  @IsOptional()
  @IsString()
  uroles?: string;

  @IsOptional()
  @IsString()
  uassign?: string;

  @IsOptional()
  @IsNumber()
  urate?: number;

  @IsOptional()
  @IsString()
  ulang?: string;

  @IsOptional()
  @IsString()
  uintegrationcc?: string;

  @IsOptional()
  @IsString()
  ucompanies?: string;

  @IsOptional()
  @IsString()
  uservices?: string;

  @IsOptional()
  @IsNumber()
  usalesgoal?: number;

  @IsOptional()
  @IsNumber()
  usalesgoaly?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  leadIds?: number[];
}
