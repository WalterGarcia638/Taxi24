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

  async execute(tripId: number): Promise<Trip | null> {
    const trip = await this.tripRepository.completeTrip(tripId);
    if (trip) {
      // Generar la factura
      await this.generateInvoiceUseCase.execute(trip);
      return trip;
    }
    return null;
  }
}
