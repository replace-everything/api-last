import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum EventType {
  MEETING = 'MEETING',
  CALL = 'CALL',
  WEBINAR = 'WEBINAR',
  OTHER = 'OTHER',
}

@Entity('PQ_events')
export class Event {
  @PrimaryGeneratedColumn()
  eid: number;

  @Column({ type: 'int', nullable: true })
  euid: number;

  @Column({ type: 'int', nullable: true })
  ejid: number;

  @Column({ type: 'int', nullable: true })
  ecid: number;

  @Column({ type: 'int', nullable: true })
  elid: number;

  @Column({ type: 'int', nullable: true })
  elocid: number;

  @Column({ type: 'enum', enum: EventType, nullable: true })
  etype: EventType;

  @Column({ type: 'datetime', nullable: true })
  estartdts: Date;

  @Column({ type: 'datetime', nullable: true })
  eenddts: Date;

  @Column({ type: 'boolean', nullable: true })
  eallday: boolean;

  @Column({ type: 'varchar', length: 84, nullable: true })
  etitle: string;

  @Column({ type: 'text', nullable: true })
  edesc: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  estatus: string;

  @Column({ type: 'int', nullable: true })
  eauid: number;

  @Column({ type: 'datetime', nullable: true })
  eadts: Date;

  @Column({ type: 'int', nullable: true })
  eduration: number;

  @Column({ type: 'varchar', length: 6, nullable: true })
  edurationtyp: string;

  @Column({ type: 'text', nullable: true })
  notify_emails: string;

  @Column({ type: 'text', nullable: true })
  notify_names: string;
}
