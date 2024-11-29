// src/infrastructure/repositories/TripRepositoryImpl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripRepository } from '../../application/ports/TripRepository';
import { Trip } from '../../domain/entities/Trip';
import { DriverEntity } from '../entities/DriverEntity';
import { Passenger } from 'src/domain/entities/Passenger';
import { Driver } from 'src/domain/entities/Driver';
import { TripEntity } from '../entities/Trip';
import { PassengerEntity } from '../entities/Passenger';

@Injectable()
export class TripRepositoryImpl implements TripRepository {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
  ) {}

  async createTrip(trip: Trip): Promise<Trip> {
    const tripEntity = this.toEntity(trip);
    const savedEntity = await this.tripRepository.save(tripEntity);
    return this.toDomain(savedEntity);
  }

  async completeTrip(id: number): Promise<Trip | null> {
    const tripEntity = await this.tripRepository.findOne({
      where: { id },
      relations: ['driver', 'passenger'],
    });
    if (tripEntity) {
      tripEntity.status = 'completed';
      tripEntity.endTime = new Date();
      const updatedEntity = await this.tripRepository.save(tripEntity);
      return this.toDomain(updatedEntity);
    }
    return null;
  }

  async findActiveTrips(): Promise<Trip[]> {
    const entities = await this.tripRepository.find({
      where: { status: 'active' },
      relations: ['driver', 'passenger'],
    });
    return entities.map(entity => this.toDomain(entity));
  }

  private toEntity(trip: Trip): TripEntity {
    const tripEntity = new TripEntity();
    tripEntity.id = trip.id;
    tripEntity.passenger = new PassengerEntity();
    tripEntity.passenger.id = trip.passenger.id;
    tripEntity.driver = new DriverEntity();
    tripEntity.driver.id = trip.driver.id;
    tripEntity.status = trip.status;
    tripEntity.startTime = trip.startTime;
    tripEntity.endTime = trip.endTime;
    tripEntity.startLatitude = trip.startLatitude;
    tripEntity.startLongitude = trip.startLongitude;
    tripEntity.endLatitude = trip.endLatitude;
    tripEntity.endLongitude = trip.endLongitude;
    tripEntity.fare = trip.fare;
    return tripEntity;
  }

  private toDomain(entity: TripEntity): Trip {
    return new Trip(
      entity.id,
      new Passenger(entity.passenger.id, entity.passenger.name),
      new Driver(
        entity.driver.id,
        entity.driver.name,
        entity.driver.latitude,
        entity.driver.longitude,
        entity.driver.status,
      ),
      entity.status,
      entity.startTime,
      entity.endTime,
      entity.startLatitude,
      entity.startLongitude,
      entity.endLatitude,
      entity.endLongitude,
      entity.fare,
    );
  }
}
