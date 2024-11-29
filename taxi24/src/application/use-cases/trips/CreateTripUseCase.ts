import { TripRepository } from "src/application/ports/TripRepository";
import { Trip } from "src/domain/entities/Trip";


export class CreateTripUseCase {
  constructor(private tripRepository: TripRepository) {}

  async execute(trip: Trip): Promise<Trip> {
    return await this.tripRepository.createTrip(trip);
  }
}
