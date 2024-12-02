import { Test, TestingModule } from '@nestjs/testing';
import { PassengersController } from 'src/adapters/controllers/PassengersController';
import { GetAllPassengersUseCase } from 'src/application/use-cases/passengers/GetAllPassengersUseCase';
import { GetPassengerByIdUseCase } from 'src/application/use-cases/passengers/GetPassengerByIdUseCase';
import { Passenger } from 'src/domain/entities/Passenger';

describe('PassengersController', () => {
  let passengersController: PassengersController;
  let getAllPassengersUseCase: GetAllPassengersUseCase;
  let getPassengerByIdUseCase: GetPassengerByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengersController],
      providers: [
        {
          provide: GetAllPassengersUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue([
              new Passenger(1, 'Alice'),
              new Passenger(2, 'Bob'),
            ]),
          },
        },
        {
          provide: GetPassengerByIdUseCase,
          useValue: {
            execute: jest.fn().mockImplementation((id: number) => {
              const passengers = [
                new Passenger(1, 'Alice'),
                new Passenger(2, 'Bob'),
              ];
              return passengers.find((p) => p.id === id) || null;
            }),
          },
        },
      ],
    }).compile();

    passengersController = module.get<PassengersController>(PassengersController);
    getAllPassengersUseCase = module.get<GetAllPassengersUseCase>(GetAllPassengersUseCase);
    getPassengerByIdUseCase = module.get<GetPassengerByIdUseCase>(GetPassengerByIdUseCase);
  });

  it('should return all passengers', async () => {
    const result = await passengersController.getAllPassengers();
    expect(result).toEqual([
      new Passenger(1, 'Alice'),
      new Passenger(2, 'Bob'),
    ]);
    expect(getAllPassengersUseCase.execute).toHaveBeenCalled();
  });

  it('should return a passenger by ID', async () => {
    const result = await passengersController.getPassengerById(1);
    expect(result).toEqual(new Passenger(1, 'Alice'));
    expect(getPassengerByIdUseCase.execute).toHaveBeenCalledWith(1);
  });

  it('should return null if passenger is not found', async () => {
    const result = await passengersController.getPassengerById(3);
    expect(result).toBeNull();
    expect(getPassengerByIdUseCase.execute).toHaveBeenCalledWith(3);
  });
});
