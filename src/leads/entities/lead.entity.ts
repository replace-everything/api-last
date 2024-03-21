import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum LeadStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

enum LeadType {
  COMMERCIAL = 'COMMERCIAL',
  RESIDENTIAL = 'RESIDENTIAL',
}

enum BuildingType {
  COMMERCIAL = 'COMMERCIAL',
  RESIDENTIAL = 'RESIDENTIAL',
}

@Entity('PQ_leads')
export class Lead {
  @PrimaryGeneratedColumn()
  lid: number;

  @Column({ type: 'int', nullable: true })
  luid: number;

  @Column({ type: 'int', nullable: true })
  lcid: number;

  @Column({ type: 'datetime', nullable: true })
  ladate: Date;

  @Column({ type: 'varchar', length: 15, nullable: true })
  lstatus: LeadStatus;

  @Column({ type: 'varchar', length: 2, nullable: true })
  lstatus2: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  ltype: LeadType;

  @Column({ type: 'text', nullable: true })
  lservice: string;

  @Column({ type: 'int', nullable: true })
  lstatusuid: number;

  @Column({ type: 'text', nullable: true })
  lstatusreason: string;

  @Column({ type: 'date', nullable: true })
  lstatusdate: Date;

  @Column({ type: 'date', nullable: true })
  llastcontact: Date;

  @Column({ type: 'int', nullable: true })
  llastcontactuid: number;

  @Column({ type: 'varchar', length: 25, nullable: true })
  lsource: string;

  @Column({ type: 'varchar', length: 72, nullable: true })
  lcomp: string;

  // Additional fields would follow the same pattern with @Column decorators...

  @Column({ type: 'varchar', length: 24, nullable: true })
  lbtype: BuildingType;

  @Column({ type: 'int', nullable: true })
  lbfloors: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lbroofmat: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  lbhatch: string;

  @Column({ type: 'int', nullable: true })
  lbheight: number;

  @Column({ type: 'date', nullable: true })
  linspection: Date;

  @Column({ type: 'date', nullable: true })
  linspectioncomp: Date;

  @Column({ type: 'text', nullable: true })
  linspectionnotes: string;

  @Column({ type: 'text', nullable: true })
  llocnotes: string;

  @Column({ type: 'tinyint', default: 0 })
  lapp: boolean;

  @Column({ type: 'varchar', length: 5, nullable: true })
  linvpays: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  linsuranceco: string;

  @Column({ type: 'varchar', length: 35, nullable: true })
  lclaimnum: string;

  @Column({ type: 'text', nullable: true })
  lsimpleinspections: string;
}
