// src/infrastructure/repositories/DriverRepositoryImpl.ts
import { DriverRepository } from '../../application/ports/DriverRepository';
import { Driver } from '../../domain/entities/Driver';
import { DriverEntity } from '../entities/DriverEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DriverRepositoryImpl implements DriverRepository {
  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
  ) {}

  async findAll(): Promise<Driver[]> {
    const entities = await this.driverRepository.find();
    return entities.map(entity => this.toDomain(entity));
  }

  async findById(id: number): Promise<Driver | null> {
    const entity = await this.driverRepository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAvailableDrivers(): Promise<Driver[]> {
    const entities = await this.driverRepository.find({ where: { status: 'available' } });
    return entities.map(entity => this.toDomain(entity));
  }

  /*async findAvailableDriversNearLocation(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ): Promise<Driver[]> {
    const radiusMeters = radiusKm * 1000;
    const entities = await this.driverRepository
      .createQueryBuilder('driver')
      .where('driver.status = :status', { status: 'available' })
      .andWhere(
        `earth_distance(ll_to_earth(driver.latitude, driver.longitude), ll_to_earth(:lat, :lng)) <= :radius`,
        { lat: latitude, lng: longitude, radius: radiusMeters },
      )
      .getMany();

    return entities.map(entity => this.toDomain(entity));
  }*/

  async findAvailableDriversNearLocation(latitude: number, longitude: number): Promise<DriverEntity[]> {
    return this.driverRepository
      .createQueryBuilder('driver')
      .select([
        'driver.id',
        'driver.name',
        'driver.latitude',
        'driver.longitude',
        `haversine(${latitude}, ${longitude}, driver.latitude, driver.longitude) AS distance`,
      ])
      .where('driver.status = :status', { status: 'available' })
      .orderBy('distance', 'ASC')
      .limit(10)
      .getRawMany();
  }

  private toDomain(entity: DriverEntity): Driver {
    return new Driver(entity.id, entity.name, entity.latitude, entity.longitude, entity.status);
  }
}
