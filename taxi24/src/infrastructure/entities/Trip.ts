/*
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
  
    @Column({ type: 'varchar' })
    status: string;
  
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
  }*/
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

  