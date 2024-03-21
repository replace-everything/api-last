import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsInt,
  IsString,
  IsDate,
  IsOptional,
  MaxLength,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';

@Entity('PQ_leads')
export class Lead {
  @PrimaryGeneratedColumn()
  @IsInt()
  lid: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsNumber()
  luid?: number;

  @ManyToOne(() => User, (user) => user.leads)
  @JoinColumn({ name: 'luid' })
  @IsOptional()
  user: User;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  lcid?: number;

  @Column({ type: 'datetime', nullable: true })
  @IsOptional()
  @IsDate()
  ladate?: Date;

  @Column({ type: 'varchar', length: 15, nullable: true })
  @IsOptional()
  @IsString()
  lstatus?: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  @IsOptional()
  @IsString()
  lstatus2?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  @IsOptional()
  @IsString()
  ltype?: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @MaxLength(65535)
  lservice?: string;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  lstatusuid?: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @MaxLength(65535)
  lstatusreason?: string;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  lstatusdate?: Date;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  llastcontact?: Date;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  llastcontactuid?: number;

  @Column({ type: 'varchar', length: 25, nullable: true })
  @IsOptional()
  @IsString()
  lsource?: string;

  @Column({ type: 'varchar', length: 72, nullable: true })
  @IsOptional()
  @IsString()
  lcomp?: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  @IsOptional()
  @IsString()
  lcontact?: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  @IsOptional()
  @IsString()
  ltitle?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @IsString()
  llname?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  @IsString()
  laddr1?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  @IsString()
  laddr2?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  @IsOptional()
  @IsString()
  lcity?: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  @IsOptional()
  @IsString()
  lst?: string;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  lzip?: number;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  llatlon?: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  @IsOptional()
  @IsString()
  lphone?: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  @IsOptional()
  @IsString()
  lext?: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  @IsOptional()
  @IsString()
  laltphone?: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  @IsOptional()
  @IsString()
  laltext?: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  @IsOptional()
  @IsString()
  lemail?: string;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsInt()
  llotid?: bigint;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @MaxLength(65535)
  lnotes?: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  @IsOptional()
  @IsString()
  lfax?: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  @IsOptional()
  @IsString()
  lcontact2?: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  @IsOptional()
  @IsString()
  ltitle2?: string;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsInt()
  lphone2?: bigint;

  @Column({ type: 'varchar', length: 6, nullable: true })
  @IsOptional()
  @IsString()
  lext2?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  lemail2?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  lemail2cc?: string;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  lbtype?: string;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  lbfloors?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @IsString()
  lbroofmat?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  @IsOptional()
  @IsString()
  lbhatch?: string;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  lbheight?: number;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  linspection?: Date;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  linspectioncomp?: Date;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @MaxLength(65535)
  linspectionnotes?: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @MaxLength(65535)
  llocnotes?: string;

  @Column({ type: 'tinyint', nullable: true })
  @IsOptional()
  @IsBoolean()
  lapp?: boolean;

  @Column({ type: 'varchar', length: 5, nullable: true })
  @IsOptional()
  @IsString()
  linvpays?: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  @IsOptional()
  @IsString()
  linsuranceco?: string;

  @Column({ type: 'varchar', length: 35, nullable: true })
  @IsOptional()
  @IsString()
  lclaimnum?: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @MaxLength(65535)
  lsimpleinspections?: string;
}
