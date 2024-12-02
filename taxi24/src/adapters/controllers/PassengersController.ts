// src/interface-adapters/controllers/PassengersController.ts
import { Controller, Get, Param } from '@nestjs/common';
import { GetAllPassengersUseCase } from '../../application/use-cases/passengers/GetAllPassengersUseCase';
import { GetPassengerByIdUseCase } from '../../application/use-cases/passengers/GetPassengerByIdUseCase';
import { Passenger } from '../../domain/entities/Passenger';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Passengers')
@Controller('passengers')
export class PassengersController {
  constructor(
    private readonly getAllPassengersUseCase: GetAllPassengersUseCase,
    private readonly getPassengerByIdUseCase: GetPassengerByIdUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all passengers' })
  async getAllPassengers(): Promise<Passenger[]> {
    return await this.getAllPassengersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a passenger by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the passenger' })
  async getPassengerById(@Param('id') id: number): Promise<Passenger | null> {
    return await this.getPassengerByIdUseCase.execute(Number(id));
  }
}
