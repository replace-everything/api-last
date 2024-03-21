import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class iOSPhotoMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  s3Url: string;

  @Column()
  creationDate: Date;

  @Column()
  location: string;

  @Column()
  resolution: string;

  @Column()
  fileFormat: string;

  @Column()
  cameraName: string;

  @Column()
  lensDetails: string;

  @Column()
  apertureSize: string;

  @Column()
  shutterSpeed: string;
}
