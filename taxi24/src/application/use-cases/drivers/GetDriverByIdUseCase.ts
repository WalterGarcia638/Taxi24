import { DriverRepository } from 'src/application/ports/DriverRepository';
import { Driver } from 'src/domain/entities/Driver';

export class GetDriverByIdUseCase {
  constructor(private readonly driverRepository: DriverRepository) {}

  async execute(id: number): Promise<Driver | null> {
    return await this.driverRepository.findById(id);
  }
}
