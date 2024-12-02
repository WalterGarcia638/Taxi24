import { TripRepository } from '../../ports/TripRepository';
import { Trip } from '../../../domain/entities/Trip';

export class GetActiveTripsUseCase {
  constructor(private tripRepository: TripRepository) {}

  async execute(): Promise<Trip[]> {
    return await this.tripRepository.findActiveTrips();
  }
}
