// src/infrastructure/entities/PassengerEntity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('passengers')
export class PassengerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
