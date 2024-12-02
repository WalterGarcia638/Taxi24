import { CreateTripDto } from "src/adapters/dto/Trip/CreateTripDto";
import { TripStatus } from "src/adapters/enums/TripStatus";
import { DriverRepository } from "src/application/ports/DriverRepository";
import { PassengerRepository } from "src/application/ports/PassengerRepository";
import { TripRepository } from "src/application/ports/TripRepository";
import { Trip } from "src/domain/entities/Trip";

export class CreateTripUseCase {
    constructor(
      private readonly tripRepository: TripRepository,
      private readonly passengerRepository: PassengerRepository,
      private readonly driverRepository: DriverRepository,
    ) {}
  
    async execute(input: CreateTripDto): Promise<Trip> {
      const passenger = await this.passengerRepository.findById(input.passengerId);
      if (!passenger) {
        throw new Error('Passenger not found');
      }
  
      const driver = await this.driverRepository.findById(input.driverId);
      if (!driver) {
        throw new Error('Driver not found');
      }
  
      const trip = new Trip(
        0,
        passenger,
        driver,
        input.status || TripStatus.ACTIVE,  // Usar "active" como predeterminado si no se proporciona
        new Date(),
        null,
        input.startLatitude,
        input.startLongitude,
      );
  
      return await this.tripRepository.createTrip(trip);
    }
  }
  