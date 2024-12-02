import { Test, TestingModule } from '@nestjs/testing';
import { DriversController } from 'src/adapters/controllers/DriversController';
import { GetAllDriversUseCase } from 'src/application/use-cases/drivers/GetAllDriversUseCase';
import { GetAvailableDriversUseCase } from 'src/application/use-cases/drivers/GetAvailableDriversUseCase';
import { GetAvailableDriversNearLocationUseCase } from 'src/application/use-cases/drivers/GetAvailableDriversNearLocationUseCase';
import { GetDriverByIdUseCase } from 'src/application/use-cases/drivers/GetDriverByIdUseCase';

describe('DriversController', () => {
  let driversController: DriversController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversController],
      providers: [
        {
          provide: GetAllDriversUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue([
              { id: 1, name: 'Alice', latitude: 40.7128, longitude: -74.006, status: 'available' },
              { id: 2, name: 'Bob', latitude: 40.7138, longitude: -74.005, status: 'available' },
            ]),
          },
        },
        {
          provide: GetAvailableDriversUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue([
              { id: 1, name: 'Alice', latitude: 40.7128, longitude: -74.006, status: 'available' },
            ]),
          },
        },
        {
          provide: GetAvailableDriversNearLocationUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue([
              { id: 2, name: 'Bob', latitude: 40.7138, longitude: -74.005, status: 'available' },
            ]),
          },
        },
        {
          provide: GetDriverByIdUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Alice',
              latitude: 40.7128,
              longitude: -74.006,
              status: 'available',
            }),
          },
        },
      ],
    }).compile();

    driversController = module.get<DriversController>(DriversController);
  });

  it('should be defined', () => {
    expect(driversController).toBeDefined();
  });

  it('getAllDrivers should return a list of all drivers', async () => {
    const result = await driversController.getAllDrivers();
    expect(result).toEqual([
      { id: 1, name: 'Alice', latitude: 40.7128, longitude: -74.006, status: 'available' },
      { id: 2, name: 'Bob', latitude: 40.7138, longitude: -74.005, status: 'available' },
    ]);
  });

  it('getAvailableDrivers should return a list of available drivers', async () => {
    const result = await driversController.getAvailableDrivers();
    expect(result).toEqual([
      { id: 1, name: 'Alice', latitude: 40.7128, longitude: -74.006, status: 'available' },
    ]);
  });

  it('getAvailableDriversNearLocation should return drivers near a specific location', async () => {
    const result = await driversController.getAvailableDriversNearby(40.7138, -74.005);
    expect(result).toEqual([
      { id: 2, name: 'Bob', latitude: 40.7138, longitude: -74.005, status: 'available' },
    ]);
  });

  it('getDriverById should return a driver by ID', async () => {
    const result = await driversController.getDriverById(1);
    expect(result).toEqual({
      id: 1,
      name: 'Alice',
      latitude: 40.7128,
      longitude: -74.006,
      status: 'available',
    });
  });
});
