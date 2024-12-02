import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('drivers')
export class DriverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column({ default: 'available' })
  status: 'available' | 'unavailable';
}
