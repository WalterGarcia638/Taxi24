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
  async findAvailableDriversNearLocation(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ): Promise<Driver[]> {
    const drivers = await this.driverRepository
      .createQueryBuilder('driver')
      .addSelect(
        `haversine(${latitude}, ${longitude}, driver.latitude, driver.longitude)`,
        'distance',
      )
      .where('driver.status = :status', { status: 'available' })
      .andWhere(
        `haversine(${latitude}, ${longitude}, driver.latitude, driver.longitude) <= :radius`,
        { radius: radiusKm },
      )
      .orderBy('distance', 'ASC')
      .getRawMany();
  
    return drivers.map((driver: any) =>
      this.toDomain({
        id: driver.driver_id,
        name: driver.driver_name,
        latitude: driver.driver_latitude,
        longitude: driver.driver_longitude,
        status: driver.driver_status,
      }),
    );
  }
  

  private toDomain(entity: DriverEntity): Driver {
    return new Driver(entity.id, entity.name, entity.latitude, entity.longitude, entity.status);
  }
}
