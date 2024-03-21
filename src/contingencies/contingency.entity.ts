import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

@Entity('PQ_contingency')
export class Contingency {
  @PrimaryGeneratedColumn()
  ctid: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  ctlid?: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  ctcid?: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  ctinid?: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  ctjid?: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  ctstatus?: boolean;

  @Column({ nullable: true })
  @IsOptional()
  ctdts?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  ctname?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  ctip?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  ctipxfrom?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  ctlatlon?: string;

  @Column({ nullable: true, type: 'text' })
  @IsOptional()
  @IsString()
  ctua?: string;
}
