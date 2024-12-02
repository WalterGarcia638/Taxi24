import { PassengerRepository } from '../../ports/PassengerRepository';
import { Passenger } from '../../../domain/entities/Passenger';

export class GetPassengerByIdUseCase {
  constructor(private passengerRepository: PassengerRepository) {}

  async execute(id: number): Promise<Passenger | null> {
    return await this.passengerRepository.findById(id);
  }
}
