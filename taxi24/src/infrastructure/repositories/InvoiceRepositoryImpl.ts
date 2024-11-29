// src/infrastructure/repositories/InvoiceRepositoryImpl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceRepository } from '../../application/ports/InvoiceRepository';
import { Invoice } from '../../domain/entities/Invoice';
import { Trip } from '../../domain/entities/Trip';
import { Passenger } from '../../domain/entities/Passenger';
import { Driver } from '../../domain/entities/Driver';
import { InvoiceEntity } from '../entities/Invoice';
import { TripEntity } from '../entities/Trip';

@Injectable()
export class InvoiceRepositoryImpl implements InvoiceRepository {
  constructor(
    @InjectRepository(InvoiceEntity)
    private invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async createInvoice(invoice: Invoice): Promise<Invoice> {
    // Convertir la entidad de dominio a entidad de infraestructura
    const invoiceEntity = this.toEntity(invoice);

    // Guardar la entidad en la base de datos
    const savedEntity = await this.invoiceRepository.save(invoiceEntity);

    // Retornar la entidad de dominio resultante
    return this.toDomain(savedEntity);
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

  private toDomain(entity: InvoiceEntity): Invoice {
    const tripEntity = entity.trip;
    const trip = new Trip(
      tripEntity.id,
      // Mapear PassengerEntity a Passenger
      new Passenger(
        tripEntity.passenger.id,
        tripEntity.passenger.name,
      ),
      // Mapear DriverEntity a Driver
      new Driver(
        tripEntity.driver.id,
        tripEntity.driver.name,
        tripEntity.driver.latitude,
        tripEntity.driver.longitude,
        tripEntity.driver.status,
      ),
      tripEntity.status,
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

  private toEntity(invoice: Invoice): InvoiceEntity {
    const invoiceEntity = new InvoiceEntity();
    invoiceEntity.id = invoice.id;
    invoiceEntity.amount = invoice.amount;
    invoiceEntity.generatedAt = invoice.generatedAt;

    // Mapear el Trip asociado
    invoiceEntity.trip = new TripEntity();
    invoiceEntity.trip.id = invoice.trip.id;

    return invoiceEntity;
  }
}
