import { Test, TestingModule } from '@nestjs/testing';
import { CreateTripUseCase } from 'src/application/use-cases/trips/CreateTripUseCase';
import { CompleteTripUseCase } from 'src/application/use-cases/trips/CompleteTripUseCase';
import { GetActiveTripsUseCase } from 'src/application/use-cases/trips/GetActiveTripsUseCase';

import { Trip } from 'src/domain/entities/Trip';
import { Driver } from 'src/domain/entities/Driver';
import { TripStatus } from 'src/adapters/enums/TripStatus';
import { CreateTripDto } from 'src/adapters/dto/Trip/CreateTripDto';
import { UpdateTripDto } from 'src/adapters/dto/Trip/UpdateTripDto';
import { TripsController } from 'src/adapters/controllers/TripsController';

describe('TripsController', () => {
  let tripsController: TripsController;
  let createTripUseCase: CreateTripUseCase;
  let completeTripUseCase: CompleteTripUseCase;
  let getActiveTripsUseCase: GetActiveTripsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        {
          provide: CreateTripUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(
              new Trip(
                1,
                { id: 1, name: 'Alice' },
                new Driver(2, 'Bob', 40.7138, -74.005, 'available'),
                TripStatus.ACTIVE,
                new Date(),
                null,
                40.7128,
                -74.006,
              ),
            ),
          },
        },
        {
          provide: CompleteTripUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(
              new Trip(
                1,
                { id: 1, name: 'Alice' },
                new Driver(2, 'Bob', 40.7138, -74.005, 'available'),
                TripStatus.COMPLETED,
                new Date(),
                new Date(),
                40.7128,
                -74.006,
                40.7138,
                -74.005,
                25.5,
              ),
            ),
          },
        },
        {
          provide: GetActiveTripsUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue([
              new Trip(
                1,
                { id: 1, name: 'Alice' },
                new Driver(2, 'Bob', 40.7138, -74.005, 'available'),
                TripStatus.ACTIVE,
                new Date(),
                null,
                40.7128,
                -74.006,
              ),
            ]),
          },
        },
      ],
    }).compile();

    tripsController = module.get<TripsController>(TripsController);
    createTripUseCase = module.get<CreateTripUseCase>(CreateTripUseCase);
    completeTripUseCase = module.get<CompleteTripUseCase>(CompleteTripUseCase);
    getActiveTripsUseCase = module.get<GetActiveTripsUseCase>(GetActiveTripsUseCase);
  });

  it('should create a trip', async () => {
    const createTripDto: CreateTripDto = {
      passengerId: 1,
      driverId: 2,
      startLatitude: 40.7128,
      startLongitude: -74.006,
    };

    const result = await tripsController.createTrip(createTripDto);

    expect(result).toEqual(
      new Trip(
        1,
        { id: 1, name: 'Alice' },
        new Driver(2, 'Bob', 40.7138, -74.005, 'available'),
        TripStatus.ACTIVE,
        expect.any(Date),
        null,
        40.7128,
        -74.006,
      ),
    );
    expect(createTripUseCase.execute).toHaveBeenCalledWith(createTripDto);
  });

  it('should complete a trip', async () => {
    const updateTripDto: UpdateTripDto = {
      endLatitude: 40.7138,
      endLongitude: -74.005,
      fare: 25.5,
    };

    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await tripsController.updateTrip(1, updateTripDto, resMock as any);

    expect(completeTripUseCase.execute).toHaveBeenCalledWith(1, 40.7138, -74.005, 25.5);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith({
      message: 'Trip completed successfully',
      trip: expect.any(Trip),
    });
  });

  it('should get active trips', async () => {
    const result = await tripsController.getActiveTrips();

    expect(result).toEqual([
      new Trip(
        1,
        { id: 1, name: 'Alice' },
        new Driver(2, 'Bob', 40.7138, -74.005, 'available'),
        TripStatus.ACTIVE,
        expect.any(Date),
        null,
        40.7128,
        -74.006,
      ),
    ]);
    expect(getActiveTripsUseCase.execute).toHaveBeenCalled();
  });
});
