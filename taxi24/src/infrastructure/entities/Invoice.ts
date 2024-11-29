// src/infrastructure/entities/InvoiceEntity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
import { TripEntity } from './Trip';
  
  
  @Entity('invoices')
  export class InvoiceEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => TripEntity)
    @JoinColumn({ name: 'trip_id' })
    trip: TripEntity;
  
    @Column('numeric', { precision: 10, scale: 2 })
    amount: number;
  
    @Column('timestamp with time zone', { name: 'generated_at', default: () => 'CURRENT_TIMESTAMP' })
    generatedAt: Date;
  }
  