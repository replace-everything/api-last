import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum TaskCategory {
  GENERAL = 'GENERAL',
  MAINTENANCE = 'MAINTENANCE',
  REPAIR = 'REPAIR',
}

enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@Entity('PQ_tasks')
export class Task {
  @PrimaryGeneratedColumn()
  tid: number;

  @Column({ type: 'int', nullable: true })
  tjid: number;

  @Column({ type: 'int', nullable: true })
  twoid: number;

  @Column({ type: 'int', nullable: true })
  tuid: number;

  @Column({ type: 'int', nullable: true })
  tassuid: number;

  @Column({ type: 'int', nullable: true })
  ticid: number;

  @Column({ type: 'date', nullable: true })
  tdts: string;

  @Column({ type: 'date', nullable: true })
  tdeadlinedts: Date;

  @Column({ type: 'time', nullable: true })
  tdeadlinetime: string;

  @Column({ type: 'datetime', nullable: true })
  topeneddts: Date;

  @Column({ type: 'date', nullable: true })
  tcompdts: Date;

  @Column({ type: 'varchar', length: 16, nullable: true })
  tcat: TaskCategory;

  @Column({ type: 'varchar', length: 16, nullable: true })
  tstatus: TaskStatus;

  @Column({ type: 'varchar', length: 16, nullable: true })
  tpriority: TaskPriority;

  @Column({ type: 'varchar', length: 48, nullable: true })
  tsummary: string;

  @Column({ type: 'text', nullable: true })
  tdetails: string;

  @Column({ type: 'text', nullable: true })
  treason: string;
}
