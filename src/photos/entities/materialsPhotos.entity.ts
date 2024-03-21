import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PQ_materialsPhotos')
export class PQMaterialsPhotos {
  @PrimaryGeneratedColumn()
  mpid: number;

  @Column({ nullable: true })
  mpmid: number;

  @Column({ nullable: true })
  mplabel: string;

  @Column({ nullable: true })
  mpfn: string;
}
