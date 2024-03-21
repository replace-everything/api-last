import { Expose } from 'class-transformer';
import { Lead } from '../../leads/entities/lead.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  RelationId,
} from 'typeorm';

@Entity('PQ_user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', comment: 'User ID' })
  uid: number;

  @Column({ type: 'varchar', length: 60, nullable: true })
  ulogin: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  upass: string;

  @Column({ type: 'varchar', length: 48, nullable: true })
  ufirstn: string;

  @Column({ type: 'varchar', length: 72, nullable: true })
  ulastn: string;

  @Column({ type: 'varchar', length: 72, nullable: true })
  uemail: string;

  @Column({ type: 'bigint', nullable: true })
  uphone: number;

  @Column({ type: 'bigint', nullable: true })
  uphonemobile: number;

  @Column({ type: 'datetime', nullable: true })
  uadddts: Date;

  @Column({ type: 'int', width: 6, nullable: true })
  uaddid: number;

  @Column({ type: 'datetime', nullable: true })
  ueditdts: Date;

  @Column({ type: 'int', width: 6, nullable: true })
  ueditid: number;

  @Column({ type: 'datetime', nullable: true })
  ulastlogin: Date;

  @Column({ type: 'datetime', nullable: true })
  ulastdts: Date;

  @Column({ type: 'datetime', nullable: true })
  ulastpassdts: Date;

  @Column({ type: 'varchar', length: 3, nullable: true })
  uestimate: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  uclients: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  ujobs: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  uinstaller: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  utemplates: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  usuper: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ustatus: string;

  @Column({ type: 'int', width: 8, nullable: true, default: () => "'0'" })
  uexpire: number;

  @Column({ type: 'varchar', length: 24, nullable: true })
  utitl: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  usys: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  ulock: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  umenuoverride: string;

  @Column({ type: 'int', width: 11, nullable: true, default: () => "'1'" })
  ucid: number;

  @Column({ type: 'varchar', length: 3, nullable: true })
  uaddpart: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  uaddpartrate: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  udefLot: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  ucntE: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  ucolor: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  ukey: string;

  @Column({ type: 'text', nullable: true })
  uperms: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  ustart: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  ustartmobile: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  ufieldRe: string;

  @Column({ type: 'text', nullable: true })
  uroles: string;

  @Column({ type: 'text', nullable: true })
  urolesBKUP: string;

  @Column({ type: 'text', nullable: true })
  uassign: string;

  @Column({ type: 'text', nullable: true })
  uwidgets: string;

  @Column({ type: 'double', precision: 5, scale: 2, nullable: true })
  urate: number;

  @Column({ type: 'varchar', length: 2, nullable: true })
  ulang: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  uintegrationcc: string;

  @Column({ type: 'varchar', length: 84, nullable: true })
  ucompanies: string;

  @Column({ type: 'text', nullable: true })
  uservices: string;

  @Column({ type: 'int', width: 7, nullable: true })
  usalesgoal: number;

  @Column({ type: 'bigint', nullable: true })
  usalesgoaly: number;

  @Column({ type: 'tinyint', nullable: true })
  ustagingaccess: boolean;

  @Column({ type: 'tinyint', nullable: true })
  umasteraccess: boolean;

  @OneToMany(() => Lead, (lead: Lead) => lead.user)
  leads?: Lead[];

  @Expose()
  @RelationId((user: User) => user.leads)
  leadIds: number[];
}
