// src/application/ports/DriverRepository.ts
import { Driver } from '../../domain/entities/Driver';

export interface DriverRepository {
  findAll(): Promise<Driver[]>;
  findById(id: number): Promise<Driver | null>;
  findAvailableDrivers(): Promise<Driver[]>;
  findAvailableDriversNearLocation(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ): Promise<Driver[]>;
}
