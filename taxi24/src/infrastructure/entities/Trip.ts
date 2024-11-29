// src/infrastructure/entities/TripEntity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { DriverEntity } from './DriverEntity';
import { PassengerEntity } from './Passenger';
  
  @Entity('trips')
  export class TripEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => PassengerEntity)
    @JoinColumn({ name: 'passenger_id' })
    passenger: PassengerEntity;
  
    @ManyToOne(() => DriverEntity)
    @JoinColumn({ name: 'driver_id' })
    driver: DriverEntity;
  
    @Column({ default: 'active' })
    status: 'active' | 'completed';
  
    @Column('timestamp with time zone', { name: 'start_time', nullable: true })
    startTime: Date;
  
    @Column('timestamp with time zone', { name: 'end_time', nullable: true })
    endTime: Date;
  
    @Column('double precision', { name: 'start_latitude' })
    startLatitude: number;
  
    @Column('double precision', { name: 'start_longitude' })
    startLongitude: number;
  
    @Column('double precision', { name: 'end_latitude', nullable: true })
    endLatitude: number;
  
    @Column('double precision', { name: 'end_longitude', nullable: true })
    endLongitude: number;
  
    @Column('numeric', { precision: 10, scale: 2, nullable: true })
    fare: number;
  }
  