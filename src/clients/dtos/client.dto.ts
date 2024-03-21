import {
  IsOptional,
  IsString,
  IsEmail,
  IsNumber,
  IsDate,
  IsBoolean,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class CreatePQClientDto {
  @IsOptional()
  @IsNumber()
  cuid?: number;

  @IsOptional()
  @IsDate()
  cadate?: Date;

  @IsOptional()
  @IsDate()
  cedate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(12)
  ctype?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  cstatus?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  clientstatus?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  clientsubstatus?: string;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  cismgmt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(72)
  ccomp?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  caddr1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  caddr2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  ccity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  cst?: string;

  @IsOptional()
  @IsNumber()
  czip?: number;

  @IsOptional()
  @IsString()
  cphone?: string;

  @IsOptional()
  @IsString()
  cphonebilling?: string;

  @IsOptional()
  @IsString()
  caltphone?: string;

  @IsOptional()
  @IsString()
  csmsphone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(6)
  cext?: string;

  @IsOptional()
  @IsString()
  cfax?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  ccontact?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  ctitle?: string;

  @ValidateIf((o) => o.cemail != null)
  @IsEmail()
  @MaxLength(80)
  cemail?: string;

  @ValidateIf((o) => o.cemailAlt != null)
  @IsEmail()
  @MaxLength(255)
  cemailAlt?: string;

  @ValidateIf((o) => o.cemailAlt2 != null)
  @IsEmail()
  @MaxLength(80)
  cemailAlt2?: string;

  @ValidateIf((o) => o.cemailAlt3 != null)
  @IsEmail()
  @MaxLength(80)
  cemailAlt3?: string;

  @ValidateIf((o) => o.cemailAlt4 != null)
  @IsEmail()
  @MaxLength(80)
  cemailAlt4?: string;

  @ValidateIf((o) => o.cemailAlt5 != null)
  @IsEmail()
  @MaxLength(80)
  cemailAlt5?: string;

  @ValidateIf((o) => o.cemailAlt6 != null)
  @IsEmail()
  @MaxLength(80)
  cemailAlt6?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  ccontact2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  ctitle2?: string;

  @IsOptional()
  @IsString()
  cphone2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(6)
  cext2?: string;

  @ValidateIf((o) => o.cemail2 != null)
  @IsEmail()
  @MaxLength(255)
  cemail2?: string;

  @ValidateIf((o) => o.cemail2cc != null)
  @IsEmail()
  @MaxLength(255)
  cemail2cc?: string;

  @ValidateIf((o) => o.cemailbilling != null)
  @IsEmail()
  @MaxLength(255)
  cemailbilling?: string;

  @ValidateIf((o) => o.caltemailbilling != null)
  @IsEmail()
  @MaxLength(255)
  caltemailbilling?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  curl?: string;

  @IsOptional()
  @IsString()
  cnotes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(124)
  cpayterms?: string;

  @IsOptional()
  @IsString()
  cview?: string;

  @IsOptional()
  @IsNumber()
  csalesid?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  creferral?: string;

  @ValidateIf((o) => o.cwon != null)
  @IsDate()
  cwon?: Date;

  @ValidateIf((o) => o.clost != null)
  @IsDate()
  clost?: Date;

  @IsOptional()
  @IsNumber()
  cqbid?: number;

  @IsOptional()
  @IsString()
  cqbresp?: string;

  @IsOptional()
  @IsNumber()
  clatefee?: number;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  cwaivelate?: string;

  @IsOptional()
  @IsNumber()
  clotid?: number;

  @IsOptional()
  @IsNumber()
  cinid?: number;

  @IsOptional()
  @IsBoolean()
  capp?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(5)
  cinvpays?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  cstatus2?: string;

  @IsOptional()
  @IsNumber()
  cstatusuid?: number;

  @IsOptional()
  @IsString()
  cstatusreason?: string;

  @ValidateIf((o) => o.cstatusdate != null)
  @IsDate()
  cstatusdate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  clatlon?: string;

  @IsOptional()
  @IsString()
  cnnote?: string;

  @ValidateIf((o) => o.cinspection != null)
  @IsDate()
  cinspection?: Date;

  @ValidateIf((o) => o.clastcontact != null)
  @IsDate()
  clastcontact?: Date;

  @IsOptional()
  @IsNumber()
  clastcontactuid?: number;
}

export class UpdatePQClientDto {
  @IsOptional()
  @IsNumber()
  cuid?: number;

  @IsOptional()
  @IsDate()
  cadate?: Date;

  @IsOptional()
  @IsDate()
  cedate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(12)
  ctype?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  cstatus?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  clientstatus?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  clientsubstatus?: string;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  cismgmt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(72)
  ccomp?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  caddr1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  caddr2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  ccity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  cst?: string;

  @IsOptional()
  @IsNumber()
  czip?: number;

  @IsOptional()
  @IsString()
  cphone?: string;

  @IsOptional()
  @IsString()
  cphonebilling?: string;

  @IsOptional()
  @IsString()
  caltphone?: string;

  @IsOptional()
  @IsString()
  csmsphone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(6)
  cext?: string;

  @IsOptional()
  @IsString()
  cfax?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  ccontact?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  ctitle?: string;

  @ValidateIf((o) => o.cemail != null)
  @IsEmail()
  @MaxLength(80)
  cemail?: string;

  @ValidateIf((o) => o.cemailAlt != null)
  @IsEmail()
  @MaxLength(255)
  cemailAlt?: string;

  @ValidateIf((o) => o.cemailAlt2 != null)
  @IsEmail()
  @MaxLength(80)
  cemailAlt2?: string;

  @ValidateIf((o) => o.cemailAlt3 != null)
  @IsEmail()
  @MaxLength(80)
  cemailAlt3?: string;

  @ValidateIf((o) => o.cemailAlt4 != null)
  @IsEmail()
  @MaxLength(80)
  cemailAlt4?: string;

  @ValidateIf((o) => o.cemailAlt5 != null)
  @IsEmail()
  @MaxLength(80)
  cemailAlt5?: string;

  @ValidateIf((o) => o.cemailAlt6 != null)
  @IsEmail()
  @MaxLength(80)
  cemailAlt6?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  ccontact2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  ctitle2?: string;

  @IsOptional()
  @IsString()
  cphone2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(6)
  cext2?: string;

  @ValidateIf((o) => o.cemail2 != null)
  @IsEmail()
  @MaxLength(255)
  cemail2?: string;

  @ValidateIf((o) => o.cemail2cc != null)
  @IsEmail()
  @MaxLength(255)
  cemail2cc?: string;

  @ValidateIf((o) => o.cemailbilling != null)
  @IsEmail()
  @MaxLength(255)
  cemailbilling?: string;

  @ValidateIf((o) => o.caltemailbilling != null)
  @IsEmail()
  @MaxLength(255)
  caltemailbilling?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  curl?: string;

  @IsOptional()
  @IsString()
  cnotes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(124)
  cpayterms?: string;

  @IsOptional()
  @IsString()
  cview?: string;

  @IsOptional()
  @IsNumber()
  csalesid?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  creferral?: string;

  @ValidateIf((o) => o.cwon != null)
  @IsDate()
  cwon?: Date;

  @ValidateIf((o) => o.clost != null)
  @IsDate()
  clost?: Date;

  @IsOptional()
  @IsNumber()
  cqbid?: number;

  @IsOptional()
  @IsString()
  cqbresp?: string;

  @IsOptional()
  @IsNumber()
  clatefee?: number;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  cwaivelate?: string;

  @IsOptional()
  @IsNumber()
  clotid?: number;

  @IsOptional()
  @IsNumber()
  cinid?: number;

  @IsOptional()
  @IsBoolean()
  capp?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(5)
  cinvpays?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  cstatus2?: string;

  @IsOptional()
  @IsNumber()
  cstatusuid?: number;

  @IsOptional()
  @IsString()
  cstatusreason?: string;

  @ValidateIf((o) => o.cstatusdate != null)
  @IsDate()
  cstatusdate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  clatlon?: string;

  @IsOptional()
  @IsString()
  cnnote?: string;

  @ValidateIf((o) => o.cinspection != null)
  @IsDate()
  cinspection?: Date;

  @ValidateIf((o) => o.clastcontact != null)
  @IsDate()
  clastcontact?: Date;

  @IsOptional()
  @IsNumber()
  clastcontactuid?: number;
}
