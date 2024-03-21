import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PQ_installerPhotos')
export class PQInstallerPhotos {
  @PrimaryGeneratedColumn()
  jrpiid: number;

  @Column({ nullable: true })
  jrpijrid: number;

  @Column()
  jrpiorder: number;

  @Column({ nullable: true })
  jrpifilename: string;
}
