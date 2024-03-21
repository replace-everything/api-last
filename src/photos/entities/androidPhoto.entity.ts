import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AndroidPhotoMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  s3Url: string;

  @Column()
  creationDate: Date;

  @Column()
  size: number;

  @Column()
  resolution: string;

  @Column()
  coordinates: string;

  @Column()
  cameraName: string;

  @Column()
  lensType: string;

  @Column()
  shutterSpeed: string;

  @Column()
  apertureStatus: string;

  @Column()
  focalLength: string;

  @Column()
  exposure: string;
}
