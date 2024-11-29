// src/application/ports/TripRepository.ts
import { Trip } from '../../domain/entities/Trip';

export interface TripRepository {
  createTrip(trip: Trip): Promise<Trip>;
  completeTrip(id: number): Promise<Trip | null>;
  findActiveTrips(): Promise<Trip[]>;
}
