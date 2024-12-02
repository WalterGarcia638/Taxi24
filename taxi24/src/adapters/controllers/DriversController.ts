// src/interface-adapters/controllers/DriversController.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { Driver } from '../../domain/entities/Driver';
import { GetAllDriversUseCase } from 'src/application/use-cases/drivers/GetAllDriversUseCase';
import { GetAvailableDriversUseCase } from 'src/application/use-cases/drivers/GetAvailableDriversUseCase';
import { GetAvailableDriversNearLocationUseCase } from 'src/application/use-cases/drivers/GetAvailableDriversNearLocationUseCase';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetDriverByIdUseCase } from 'src/application/use-cases/drivers/GetDriverByIdUseCase';

@Controller('drivers')
export class DriversController {
  constructor(
    private readonly getAllDriversUseCase: GetAllDriversUseCase,
    private readonly getAvailableDriversUseCase: GetAvailableDriversUseCase,
    private readonly getAvailableDriversNearLocationUseCase: GetAvailableDriversNearLocationUseCase,
    private readonly getDriverByIdUseCase: GetDriverByIdUseCase
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

  @Get('available/nearby')
  @ApiOperation({ summary: 'Get available drivers within a specific radius' })
  @ApiQuery({ name: 'latitude', description: 'Latitude of the location', example: 40.7128 })
  @ApiQuery({ name: 'longitude', description: 'Longitude of the location', example: -74.0060 })
  @ApiQuery({ name: 'radiusKm', description: 'Radius in kilometers', example: 3 })
  async getAvailableDriversNearby(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radiusKm') radiusKm = 3,
  ) {
    return await this.getAvailableDriversNearLocationUseCase.execute(latitude, longitude, radiusKm);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, required: true })
  async getDriverById(@Param('id') id: number) {
    return await this.getDriverByIdUseCase.execute(id);
  }
}
