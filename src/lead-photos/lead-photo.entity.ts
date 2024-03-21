import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

@Entity('PQ_leadPhotos')
export class LeadPhoto {
  @PrimaryGeneratedColumn()
  lpid: number;

  @Column()
  @IsInt()
  lplid: number;

  @Column()
  @IsInt()
  lpcid: number;

  @Column()
  @IsInt()
  lpinid: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  lpfilename?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  lpext?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  lpcat?: string;

  @Column({ nullable: true, type: 'datetime' })
  @IsOptional()
  @IsDateString()
  lpdts?: Date;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  lpphotoidcc?: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  lpphotodtscc?: number;
}
