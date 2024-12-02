import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceRepository } from '../../application/ports/InvoiceRepository';
import { Invoice } from '../../domain/entities/Invoice';
import { Trip } from '../../domain/entities/Trip';
import { Passenger } from '../../domain/entities/Passenger';
import { Driver } from '../../domain/entities/Driver';
import { InvoiceEntity } from '../entities/Invoice';
import { TripEntity } from '../entities/Trip';
import { TripStatus } from 'src/adapters/enums/TripStatus';
import { TripRepository } from 'src/application/ports/TripRepository';

@Injectable()
export class InvoiceRepositoryImpl implements InvoiceRepository {
  constructor(
    @InjectRepository(InvoiceEntity)
    private invoiceRepository: Repository<InvoiceEntity>,

    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>, 
  ) {}

  async createInvoice(invoice: Invoice): Promise<Invoice> {
    const existingInvoice = await this.findByTripId(invoice.trip.id);
  
    if (existingInvoice) {
      throw new Error('Invoice already exists for this trip.');
    }
  
    const invoiceEntity = await this.toEntity(invoice);
    console.log('Existing invoice:', existingInvoice);
  
    try {
      const savedEntity = await this.invoiceRepository.save(invoiceEntity);
      return this.toDomain(savedEntity);
    } catch (error) {
      if (error.code === '23505') { 
        throw new Error('Duplicate entry for trip_id in invoices table.');
      }
      throw error;
    }
  }
  
  

  async findById(id: number): Promise<Invoice | null> {
    const invoiceEntity = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['trip', 'trip.driver', 'trip.passenger'],
    });
    if (invoiceEntity) {
      return this.toDomain(invoiceEntity);
    }
    return null;
  }

async findByTripId(tripId: number): Promise<Invoice | null> {
    const invoiceEntity = await this.invoiceRepository.findOne({
      where: { trip: { id: tripId } },
      relations: ['trip'],
    });
    if (!invoiceEntity) {
      return null;
    }
    console.log('Finding invoice for tripId:', tripId);
    return this.toDomain(invoiceEntity);
  }
  

  private toDomain(entity: InvoiceEntity): Invoice {
    if (!entity.trip) {
      throw new Error(`Invoice ${entity.id} does not have a trip.`);
    }
    if (!entity.trip.passenger) {
      throw new Error(`Trip ${entity.trip.id} does not have a passenger.`);
    }
    if (!entity.trip.driver) {
      throw new Error(`Trip ${entity.trip.id} does not have a driver.`);
    }

    const tripEntity = entity.trip;
    const trip = new Trip(
      tripEntity.id,
      tripEntity.passenger
      ? new Passenger(tripEntity.passenger.id, tripEntity.passenger.name)
      : null,
      new Driver(
        tripEntity.driver.id,
        tripEntity.driver.name,
        tripEntity.driver.latitude,
        tripEntity.driver.longitude,
        tripEntity.driver.status,
      ),
      tripEntity.status as TripStatus,
      tripEntity.startTime,
      tripEntity.endTime,
      tripEntity.startLatitude,
      tripEntity.startLongitude,
      tripEntity.endLatitude,
      tripEntity.endLongitude,
      tripEntity.fare,
    );
    return new Invoice(
      entity.id,
      trip,
      entity.amount,
      entity.generatedAt,
    );
  }

  private async toEntity(invoice: Invoice): Promise<InvoiceEntity> {
    const invoiceEntity = new InvoiceEntity();
    invoiceEntity.amount = invoice.amount;
    invoiceEntity.generatedAt = invoice.generatedAt;
  
    const tripEntity = await this.tripRepository.findOne({
      where: { id: invoice.trip.id },
    });
  
    if (!tripEntity) {
      throw new Error(`Trip with id ${invoice.trip.id} not found`);
    }
  
    invoiceEntity.trip = tripEntity;
  
    return invoiceEntity;
  }

 
}
