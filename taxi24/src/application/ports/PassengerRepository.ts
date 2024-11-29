// src/application/ports/PassengerRepository.ts
import { Passenger } from '../../domain/entities/Passenger';

export interface PassengerRepository {
  findAll(): Promise<Passenger[]>;
  findById(id: number): Promise<Passenger | null>;
}
