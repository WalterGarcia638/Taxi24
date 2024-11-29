import { DriverRepository } from "src/application/ports/DriverRepository";
import { Driver } from "src/domain/entities/Driver";


export class GetAllDriversUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(): Promise<Driver[]> {
    return await this.driverRepository.findAll();
  }
}
