import { DriverRepository } from "src/application/ports/DriverRepository";
import { Driver } from "src/domain/entities/Driver";

export class GetAvailableDriversNearLocationUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(latitude: number, longitude: number, radiusKm: number): Promise<Driver[]> {
    return await this.driverRepository.findAvailableDriversNearLocation(
      latitude,
      longitude,
      radiusKm,
    );
  }
}
