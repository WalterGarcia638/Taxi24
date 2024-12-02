import { Trip } from '../../domain/entities/Trip';

export interface TripRepository {
  createTrip(trip: Trip): Promise<Trip>;
  completeTrip(id: number, endLatitude: number, endLongitude: number, fare: number): Promise<Trip | null>;
  findActiveTrips(): Promise<Trip[]>;
  findOne(conditions: Partial<Trip>): Promise<Trip | null>; 
  findById(id: number): Promise<Trip | null>;
  
}
