import { Test, TestingModule } from '@nestjs/testing';
import { DriversController } from '../src/adapters/controllers/DriversController';
import { GetAllDriversUseCase } from '../src/application/use-cases/drivers/GetAllDriversUseCase';
import { GetAvailableDriversNearLocationUseCase } from '../src/application/use-cases/drivers/GetAvailableDriversNearLocationUseCase';
import { GetAvailableDriversUseCase } from '../src/application/use-cases/drivers/GetAvailableDriversUseCase';
import { Driver } from 'src/domain/entities/Driver';


describe('DriversController', () => {
  let driversController: DriversController;
  let getAllDriversUseCase: GetAllDriversUseCase;
  let getAvailableDriversUseCase: GetAvailableDriversUseCase;
  let getAvailableDriversNearLocationUseCase: GetAvailableDriversNearLocationUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversController],
      providers: [
        {
          provide: GetAllDriversUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetAvailableDriversUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetAvailableDriversNearLocationUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    driversController = module.get<DriversController>(DriversController);
    getAllDriversUseCase = module.get<GetAllDriversUseCase>(GetAllDriversUseCase);
    getAvailableDriversUseCase = module.get<GetAvailableDriversUseCase>(GetAvailableDriversUseCase);
    getAvailableDriversNearLocationUseCase = module.get<GetAvailableDriversNearLocationUseCase>(
      GetAvailableDriversNearLocationUseCase,
    );
  });

  describe('getAllDrivers', () => {
    it('should return a list of all drivers', async () => {
      const drivers: Driver[] = [
        new Driver(1, 'Alice', 40.7128, -74.0060, 'available'),
        new Driver(2, 'Bob', 40.7138, -74.0050, 'unavailable'),
      ];
      jest.spyOn(getAllDriversUseCase, 'execute').mockResolvedValue(drivers);

      const result = await driversController.getAllDrivers();
      expect(result).toEqual(drivers);
      expect(getAllDriversUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('getAvailableDrivers', () => {
    it('should return a list of available drivers', async () => {
      const drivers: Driver[] = [
        new Driver(1, 'Alice', 40.7128, -74.0060, 'available'),
        new Driver(2, 'Bob', 40.7138, -74.0050, 'available'),
      ];
      jest.spyOn(getAvailableDriversUseCase, 'execute').mockResolvedValue(drivers);

      const result = await driversController.getAvailableDrivers();
      expect(result).toEqual(drivers);
      expect(getAvailableDriversUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('getAvailableDriversNearLocation', () => {
    it('should return a list of drivers near a specific location within 3 km', async () => {
      const latitude = 40.7128;
      const longitude = -74.0060;
      const drivers: Driver[] = [
        new Driver(1, 'Alice', 40.7128, -74.0060, 'available'),
        new Driver(2, 'Bob', 40.7138, -74.0050, 'available'),
      ];
      jest.spyOn(getAvailableDriversNearLocationUseCase, 'execute').mockResolvedValue(drivers);

      const result = await driversController.getAvailableDriversNearby(latitude, longitude);
      expect(result).toEqual(drivers);
      expect(getAvailableDriversNearLocationUseCase.execute).toHaveBeenCalledWith(latitude, longitude, 3);
    });
  });

  describe('getDriverById', () => {
    it('should return a driver by ID', async () => {
      const driver: Driver = new Driver(1, 'Alice', 40.7128, -74.0060, 'available');
      jest.spyOn(getAllDriversUseCase, 'execute').mockResolvedValue([driver]);

      const result = await driversController.getDriverById(1);
      expect(result).toEqual(driver);
      expect(getAllDriversUseCase.execute).toHaveBeenCalled();
    });

    it('should throw an exception if the driver is not found', async () => {
      jest.spyOn(getAllDriversUseCase, 'execute').mockResolvedValue([]);

      await expect(driversController.getDriverById(999)).rejects.toThrowError('Driver not found');
      expect(getAllDriversUseCase.execute).toHaveBeenCalled();
    });
  });
});
