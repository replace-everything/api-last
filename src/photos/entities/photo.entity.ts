import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PQ_photos')
export class Photo {
  @PrimaryGeneratedColumn()
  photoid: number;

  @Column({ nullable: true })
  pjobid: number;

  @Column({ nullable: true })
  pwoid: number;

  @Column({ nullable: true })
  pwotype: string;

  @Column({ nullable: true })
  puser: string;

  @Column({ nullable: true })
  photoname: number;

  @Column({ nullable: true })
  photoext: string;

  @Column({ type: 'datetime', nullable: true })
  photodts: Date;

  @Column({ nullable: true })
  photolabel: string;

  @Column({ nullable: true })
  phototags: string;

  @Column()
  photoorder: number;
}
