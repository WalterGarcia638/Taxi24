import { PassengerRepository } from "src/application/ports/PassengerRepository";
import { Passenger } from "src/domain/entities/Passenger";


export class GetAllPassengersUseCase {
  constructor(private passengerRepository: PassengerRepository) {}

  async execute(): Promise<Passenger[]> {
    return await this.passengerRepository.findAll();
  }
}
