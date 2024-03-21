import {
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
  IsDecimal,
} from 'class-validator';

export class InvoiceDto {
  @IsNumber()
  invid: number = 0;

  @IsNumber()
  @IsOptional()
  invcid?: number;

  @IsNumber()
  @IsOptional()
  invjid?: number;

  @IsNumber()
  @IsOptional()
  invjrid?: number;

  @IsNumber()
  @IsOptional()
  invuid?: number;

  @IsDate()
  @IsOptional()
  invdate?: Date;

  @IsDate()
  @IsOptional()
  invdatedue?: Date;

  @IsDate()
  @IsOptional()
  invsent?: Date;

  @IsDate()
  @IsOptional()
  invopen?: Date;

  @IsDate()
  @IsOptional()
  invaccept?: Date;

  @IsString()
  @IsOptional()
  invstatus?: string;

  @IsString()
  @IsOptional()
  invtype?: string;

  @IsDecimal()
  @IsOptional()
  invtotal?: number;

  @IsString()
  @IsOptional()
  invkey?: string;

  @IsString()
  @IsOptional()
  invreason?: string;

  @IsNumber()
  @IsOptional()
  invcommuid?: number;

  @IsDecimal()
  @IsOptional()
  invcommtot?: number;

  @IsDate()
  @IsOptional()
  invcommdts?: Date;

  @IsDecimal()
  @IsOptional()
  invcommtot2?: number;

  @IsDate()
  @IsOptional()
  invcommdts2?: Date;

  @IsNumber()
  @IsOptional()
  iqbid?: number;

  @IsNumber()
  @IsOptional()
  iqbstat?: number;

  @IsString()
  @IsOptional()
  iqbinvoicenum?: string;

  @IsString()
  @IsOptional()
  iqbresp?: string;

  @IsString()
  @IsOptional()
  iqbitem?: string;

  @IsNumber()
  @IsOptional()
  invnolate?: number;

  @IsDate()
  @IsOptional()
  invpaidfull?: Date;

  @IsDecimal()
  @IsOptional()
  invlatefee?: number;

  @IsDecimal()
  @IsOptional()
  invpaid?: number;

  @IsString()
  @IsOptional()
  invpays?: string;

  @IsNumber()
  @IsOptional()
  invpaysid?: number;

  @IsString()
  @IsOptional()
  invpaystatus?: string;

  @IsNumber()
  @IsOptional()
  invtm?: number;
}
