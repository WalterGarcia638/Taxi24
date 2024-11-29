// src/interface-adapters/controllers/DriversController.ts
import { Controller, Get, Query } from '@nestjs/common';
import { Driver } from '../../domain/entities/Driver';
import { GetAllDriversUseCase } from 'src/application/use-cases/drivers/GetAllDriversUseCase';
import { GetAvailableDriversUseCase } from 'src/application/use-cases/drivers/GetAvailableDriversUseCase';
import { GetAvailableDriversNearLocationUseCase } from 'src/application/use-cases/drivers/GetAvailableDriversNearLocationUseCase';

@Controller('drivers')
export class DriversController {
  constructor(
    private readonly getAllDriversUseCase: GetAllDriversUseCase,
    private readonly getAvailableDriversUseCase: GetAvailableDriversUseCase,
    private readonly getAvailableDriversNearLocationUseCase: GetAvailableDriversNearLocationUseCase,
  ) {}

  @Get()
  async getAllDrivers(): Promise<Driver[]> {
    return await this.getAllDriversUseCase.execute();
  }

  @Get('available')
  async getAvailableDrivers(
    @Query('latitude') latitude?: number,
    @Query('longitude') longitude?: number,
  ): Promise<Driver[]> {
    if (latitude !== undefined && longitude !== undefined) {
      return await this.getAvailableDriversNearLocationUseCase.execute(
        Number(latitude),
        Number(longitude),
        3, // Radio de 3 km
      );
    }
    return await this.getAvailableDriversUseCase.execute();
  }
}
