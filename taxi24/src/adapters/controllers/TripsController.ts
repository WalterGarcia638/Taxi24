import { Controller, Post, Body, Patch, Param, Get, HttpException, HttpStatus, Res } from '@nestjs/common';
import { CreateTripUseCase } from '../../application/use-cases/trips/CreateTripUseCase';
import { CompleteTripUseCase } from '../../application/use-cases/trips/CompleteTripUseCase';
import { Trip } from '../../domain/entities/Trip';
import { GetActiveTripsUseCase } from 'src/application/use-cases/trips/GetActiveTripsUseCase';
import { CreateTripDto } from '../dto/Trip/CreateTripDto';
import { UpdateTripDto } from '../dto/Trip/UpdateTripDto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express'; 

@Controller('trips')
export class TripsController {
  constructor(
    private readonly createTripUseCase: CreateTripUseCase,
    private readonly completeTripUseCase: CompleteTripUseCase,
    private readonly getActiveTripsUseCase: GetActiveTripsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiBody({
    type: CreateTripDto,
    description: 'Data required to create a trip',
    examples: {
      example1: {
        summary: 'Example input',
        value: {
          passengerId: 1,
          driverId: 2,
          startLatitude: 40.7128,
          startLongitude: -74.006,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Trip created successfully', type: Trip })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async createTrip(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return await this.createTripUseCase.execute(createTripDto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Complete a trip' })
  @ApiParam({ name: 'id', description: 'ID of the trip to complete', example: 1 })
  @ApiBody({
    type: UpdateTripDto,
    description: 'Data to complete a trip',
    examples: {
      example1: {
        summary: 'Example input',
        value: {
          endLatitude: 40.7138,
          endLongitude: -74.005,
          fare: 25.5,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Trip completed successfully' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  async updateTrip(
    @Param('id') tripId: number,
    @Body() updateTripDto: UpdateTripDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const trip = await this.completeTripUseCase.execute(
        tripId,
        updateTripDto.endLatitude,
        updateTripDto.endLongitude,
        updateTripDto.fare,
      );

      res.status(200).json({
        message: 'Trip completed successfully',
        trip,
      });
    } catch (error) {
      console.error('Error completing trip:', error.message);

      res.status(200).json({
        message: 'An error occurred while completing the trip',
        error: error.message,
      });
    }
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active trips' })
  @ApiResponse({
    status: 200,
    description: 'List of active trips',
    type: [Trip],
  })
  async getActiveTrips(): Promise<Trip[]> {
    return await this.getActiveTripsUseCase.execute();
  }
}


