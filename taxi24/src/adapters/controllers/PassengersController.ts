// src/interface-adapters/controllers/PassengersController.ts
import { Controller, Get, Param } from '@nestjs/common';
import { GetAllPassengersUseCase } from '../../application/use-cases/passengers/GetAllPassengersUseCase';
import { GetPassengerByIdUseCase } from '../../application/use-cases/passengers/GetPassengerByIdUseCase';
import { Passenger } from '../../domain/entities/Passenger';

@Controller('passengers')
export class PassengersController {
  constructor(
    private readonly getAllPassengersUseCase: GetAllPassengersUseCase,
    private readonly getPassengerByIdUseCase: GetPassengerByIdUseCase,
  ) {}

  @Get()
  async getAllPassengers(): Promise<Passenger[]> {
    return await this.getAllPassengersUseCase.execute();
  }

  @Get(':id')
  async getPassengerById(@Param('id') id: number): Promise<Passenger | null> {
    return await this.getPassengerByIdUseCase.execute(Number(id));
  }
}
