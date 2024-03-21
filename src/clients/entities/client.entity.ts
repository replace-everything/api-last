import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

enum ClientType {
  INDIVIDUAL = 'individual',
  CORPORATE = 'corporate',
}

enum ClientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('PQ_client')
@Index(['cid'], { unique: true })
export class Client {
  @PrimaryGeneratedColumn()
  cid: number;

  @Column({ type: 'int', nullable: true })
  cuid: number;

  @Column({ type: 'date', nullable: true })
  cadate: Date;

  @Column({ type: 'date', nullable: true })
  cedate: Date;

  @Column({ type: 'enum', enum: ClientType, nullable: true })
  ctype: ClientType;

  @Column({ type: 'varchar', length: 8, nullable: true })
  cstatus: ClientStatus;

  @Column({ type: 'varchar', length: 16, nullable: true })
  clientstatus: string; // Could be modified to Enum if the values are known

  @Column({ type: 'varchar', length: 16, nullable: true })
  clientsubstatus: string; // Could be modified to Enum if the values are known

  @Column({ type: 'varchar', length: 3, nullable: true })
  cismgmt: string; // Could be boolean, e.g., true for "Yes", false for "No", if values are known

  @Column({ type: 'varchar', length: 72, nullable: true })
  ccomp: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  caddr1: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  caddr2: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  ccity: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  cst: string;

  @Column({ type: 'int', nullable: true })
  czip: number;

  @Column({ type: 'bigint', nullable: true })
  cphone: string;

  @Column({ type: 'bigint', nullable: true })
  cphonebilling: string;

  @Column({ type: 'bigint', nullable: true })
  caltphone: string;

  @Column({ type: 'bigint', nullable: true })
  csmsphone: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  cext: string;

  @Column({ type: 'bigint', nullable: true })
  cfax: string;
}
