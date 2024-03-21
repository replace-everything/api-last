import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsInt,
  IsDate,
  IsString,
  IsEmail,
  MaxLength,
  IsOptional,
  IsNumberString,
  IsNumber,
} from 'class-validator';

@Entity('PQ_building')
export class Building {
  @PrimaryGeneratedColumn()
  bid: number;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  badate: Date | null;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  bedate: Date | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  blid: number | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  bcid: number | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  bmid: number | null;

  @Column({ type: 'varchar', length: 60, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  bcontact: string | null;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumberString()
  bcontactphone: string | null;

  @Column({ type: 'varchar', length: 75, nullable: true })
  @IsOptional()
  @IsEmail()
  @MaxLength(75)
  bcontactemail: string | null;

  @Column({ type: 'varchar', length: 60, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  bcontact2: string | null;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumberString()
  bcontactphone2: string | null;

  @Column({ type: 'varchar', length: 75, nullable: true })
  @IsOptional()
  @IsEmail()
  @MaxLength(75)
  bcontactemail2: string | null;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  btype: string | null;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  bsector: string | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  bsize: number | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  bfloors: number | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  blayers: number | null;

  @Column({ type: 'float', nullable: true })
  @IsOptional()
  @IsNumber()
  bpitch: number | null;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  broof: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  broofmat: string | null;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  bmaterial: string | null;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  bmaterial2: string | null;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  bmaterial3: string | null;

  @Column({ type: 'varchar', length: 3, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  bhatch: string | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  bheight: number | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  bbheight: number | null;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  bsys: string | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  bmfr: number | null;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  bmil: string | null;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  bwar: string | null;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  binstall: Date | null;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  blastserv: Date | null;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  bnextserv: Date | null;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  blastrep: Date | null;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  bnextrep: Date | null;

  @Column({ type: 'varchar', length: 60, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  bname: string | null;

  @Column({ type: 'varchar', length: 18, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(18)
  bnum: string | null;

  @Column({ type: 'varchar', length: 3, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  bsame: string | null;

  @Column({ type: 'varchar', length: 60, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  baddr1: string | null;

  @Column({ type: 'varchar', length: 60, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  baddr2: string | null;

  @Column({ type: 'varchar', length: 32, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  bcity: string | null;

  @Column({ type: 'varchar', length: 2, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(2)
  bst: string | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  @IsOptional()
  @IsInt()
  bzip: number | null;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  blatlon: string | null;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  bnotes: string | null;

  @Column({ type: 'varchar', length: 42, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(42)
  bcnt: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  @IsOptional()
  @IsEmail()
  @MaxLength(80)
  bcntemail: string | null;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumberString()
  bcntphone: string | null;

  @Column({ type: 'varchar', length: 3, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  bview: string | null;
}
