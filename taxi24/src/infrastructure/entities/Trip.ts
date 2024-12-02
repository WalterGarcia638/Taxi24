import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PassengerEntity } from './Passenger';
import { DriverEntity } from './DriverEntity';

@Entity('trips')
export class TripEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date | null;

  @Column({ type: 'float' })
  startLatitude: number;

  @Column({ type: 'float' })
  startLongitude: number;

  @Column({ type: 'float', nullable: true })
  endLatitude: number | null;

  @Column({ type: 'float', nullable: true })
  endLongitude: number | null;

  @Column({ type: 'float', nullable: true })
  fare: number | null;

  @ManyToOne(() => PassengerEntity, { nullable: false })
  passenger: PassengerEntity;

  @ManyToOne(() => DriverEntity, { nullable: false })
  driver: DriverEntity;
}

  