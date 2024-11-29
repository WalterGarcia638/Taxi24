// src/interface-adapters/controllers/TripsController.ts
import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { CreateTripUseCase } from '../../application/use-cases/trips/CreateTripUseCase';
import { CompleteTripUseCase } from '../../application/use-cases/trips/CompleteTripUseCase';
import { Trip } from '../../domain/entities/Trip';
import { GetActiveTripsUseCase } from 'src/application/use-cases/trips/GetActiveTripsUseCase';

@Controller('trips')
export class TripsController {
  constructor(
    private readonly createTripUseCase: CreateTripUseCase,
    private readonly completeTripUseCase: CompleteTripUseCase,
    private readonly getActiveTripsUseCase: GetActiveTripsUseCase,
  ) {}

  @Post()
  async createTrip(@Body() tripData): Promise<Trip> {
    // Mapear tripData a una instancia de Trip
    const trip = new Trip(
      0, // Se generará automáticamente
      tripData.passenger,
      tripData.driver,
      'active',
      new Date(),
      null,
      tripData.startLatitude,
      tripData.startLongitude,
    );
    return await this.createTripUseCase.execute(trip);
  }

  @Patch(':id/complete')
  async completeTrip(@Param('id') id: number): Promise<Trip | null> {
    return await this.completeTripUseCase.execute(id);
  }

  @Get('active')
  async getActiveTrips(): Promise<Trip[]> {
    return await this.getActiveTripsUseCase.execute();
  }
}
