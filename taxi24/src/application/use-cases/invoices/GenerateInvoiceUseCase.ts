import { InvoiceRepository } from '../../ports/InvoiceRepository';
import { Trip } from '../../../domain/entities/Trip';
import { Invoice } from '../../../domain/entities/Invoice';
import { TripRepository } from 'src/application/ports/TripRepository';

  export class GenerateInvoiceUseCase {
    constructor(
      private readonly invoiceRepository: InvoiceRepository,
      private readonly tripRepository: TripRepository,
    ) {}

      async execute(tripId: number): Promise<Invoice> {
        const trip = await this.tripRepository.findById(tripId);
        if (!trip) {
          throw new Error('Trip not found.');
        }
      
        const existingInvoice = await this.invoiceRepository.findByTripId(tripId);
        if (existingInvoice) {
          throw new Error('Invoice already exists for this trip.');
        }
      
        if (trip.endLatitude === null || trip.endLongitude === null) {
          throw new Error('Cannot generate invoice: Trip is not completed.');
        }
      
        const amount = this.calculateAmount(trip);
      
        const invoice = new Invoice(0, trip, amount, new Date());
        return await this.invoiceRepository.createInvoice(invoice);
      }

      private calculateAmount(trip: Trip): number {

        if (trip.endLatitude === null || trip.endLongitude === null) {
          throw new Error('Cannot calculate amount: Trip is not completed.');
        }
      

        if (trip.fare !== null && trip.fare > 0) {
          return trip.fare;
        }

        const baseRate = 5; 
        const costPerKm = 2; 
      
    
        const distance = this.calculateDistance(
          trip.startLatitude,
          trip.startLongitude,
          trip.endLatitude,
          trip.endLongitude,
        );
      
        const calculatedFare = baseRate + costPerKm * distance;
      
        trip.fare = calculatedFare;
      
        return calculatedFare;
      }
      private calculateDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
      ): number {
        const R = 6371; 
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(lon2 - lon1);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.degreesToRadians(lat1)) *
            Math.cos(this.degreesToRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        return R * c; 
      }
      
      private degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
      }
         
  }
  
  

 

  

