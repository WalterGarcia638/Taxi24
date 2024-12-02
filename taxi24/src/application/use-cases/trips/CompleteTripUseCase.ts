// src/application/use-cases/trips/CompleteTripUseCase.ts
import { TripRepository } from '../../ports/TripRepository';
import { InvoiceRepository } from '../../ports/InvoiceRepository';
import { Trip } from '../../../domain/entities/Trip';
import { GenerateInvoiceUseCase } from '../invoices/GenerateInvoiceUseCase';

export class CompleteTripUseCase {
  constructor(
    private tripRepository: TripRepository,
    private generateInvoiceUseCase: GenerateInvoiceUseCase,
  ) {}

  async execute(tripId: number, endLatitude: number, endLongitude: number, fare: number): Promise<Trip | null> {
    const trip = await this.tripRepository.completeTrip(tripId, endLatitude, endLongitude, fare);
    if (!trip) {
      throw new Error('Trip not found.');
    }
  
    if (!trip.endLatitude || !trip.endLongitude) {
      throw new Error('Cannot complete trip: Missing end coordinates.');
    }
  
    await this.generateInvoiceUseCase.execute(trip.id);
  
    return trip;
  }
  
  
}
