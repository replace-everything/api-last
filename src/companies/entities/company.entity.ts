import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsOptional,
  IsInt,
  IsString,
  MaxLength,
  IsEmail,
  IsUrl,
  IsNumber,
  Min,
} from 'class-validator';

@Entity('PQ_co')
export class Company {
  @PrimaryGeneratedColumn()
  @IsInt()
  coid: number;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(12)
  coapplyto?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  coname?: string;

  // Licenses
  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  colicense1?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  colicense2?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  colicense3?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  colicense4?: string;

  // Address
  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(72)
  coaddr1?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(72)
  coaddr2?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(36)
  cocity?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(2)
  costate?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  cozip?: string;

  // Contact
  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  cophone1?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  cophone2?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsEmail()
  @MaxLength(55)
  coemail?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  cofax?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsUrl()
  @MaxLength(240)
  courl?: string;

  // Other details
  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(12)
  cstatus?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(12)
  cstatusmaster?: string;

  @Column({ type: 'text', default: null, nullable: true })
  @IsOptional()
  cservices?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(12)
  csector?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  coins?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsInt()
  comatloc?: number;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(35)
  colatlon?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  cologo?: string;

  @Column({ default: 7 })
  @IsInt()
  @Min(0)
  coresdue: number;

  @Column({ default: 30 })
  @IsInt()
  @Min(0)
  cocomdue: number;

  @Column({ type: 'double', default: 0.0, nullable: true })
  @IsOptional()
  @IsNumber()
  colaterate?: number;

  @Column({ type: 'text', default: null, nullable: true })
  @IsOptional()
  coinnotecom?: string;

  @Column({ type: 'text', default: null, nullable: true })
  @IsOptional()
  coinnoteres?: string;

  @Column({ type: 'text', default: null, nullable: true })
  @IsOptional()
  cointerms?: string;

  @Column({ type: 'text', default: null, nullable: true })
  @IsOptional()
  coincontingency?: string;

  @Column({ type: 'text', default: null, nullable: true })
  @IsOptional()
  coeula?: string;

  @Column({ type: 'double', default: null, nullable: true })
  @IsOptional()
  @IsNumber()
  coeulaversion?: number;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  cocctoken?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  coreviewlink?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  coreviewtext?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsInt()
  coexpdaysres?: number;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsInt()
  coexpdayscom?: number;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsInt()
  cosalesgoal?: number;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsInt()
  cosalesgoaly?: number;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(35)
  cotimezone?: string;

  @Column({ default: null, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(5)
  cocheckout?: string;
}
