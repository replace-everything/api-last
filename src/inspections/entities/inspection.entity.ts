import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PQ_inspections')
export class Inspection {
  @PrimaryGeneratedColumn()
  inid: number;

  @Column({ type: 'int', nullable: true })
  inlid: number;

  @Column({ type: 'int', nullable: true })
  inbid: number;

  @Column({ type: 'int', nullable: true })
  incid: number;

  @Column({ type: 'int', nullable: true })
  injid: number;

  @Column({ type: 'int', nullable: true })
  inlotid: number;

  @Column({ type: 'datetime', nullable: true })
  indts: Date;

  @Column({ type: 'int', nullable: true })
  incomsalesid: number;

  @Column({ type: 'datetime', nullable: true })
  incomdts: Date;

  @Column({ type: 'varchar', length: 18, nullable: true })
  incomkey: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  incomshow: string;

  @Column({ type: 'text', nullable: true })
  insimpleinspections: string;

  @Column({ type: 'text', nullable: true })
  inservices: string;

  @Column({ type: 'bigint', nullable: true })
  inprojectidcc: bigint;

  @Column({ type: 'varchar', length: 150, nullable: true })
  inurlappcc: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  inurlpubcc: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  inurlprojcc: string;
}
