import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
import { TripEntity } from './Trip';
@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  generatedAt: Date;

  @OneToOne(() => TripEntity)
  @JoinColumn({ name: 'trip_id' })
  trip: TripEntity;
}

  