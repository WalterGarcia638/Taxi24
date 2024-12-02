import { Test, TestingModule } from '@nestjs/testing';
import { GetInvoiceByIdUseCase } from 'src/application/use-cases/invoices/GetInvoiceByIdUseCase';
import { Invoice } from 'src/domain/entities/Invoice';
import { Trip } from 'src/domain/entities/Trip';
import { TripStatus } from 'src/adapters/enums/TripStatus';
import { InvoicesController } from 'src/adapters/controllers/InvoicesController';

describe('InvoicesController', () => {
  let invoicesController: InvoicesController;
  let getInvoiceByIdUseCase: GetInvoiceByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [
        {
          provide: GetInvoiceByIdUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(
              new Invoice(
                1,
                new Trip(
                  1,
                  null,
                  null,
                  TripStatus.ACTIVE,
                  new Date('2024-12-02T12:30:24.124Z'),
                  null,
                  40.7128,
                  -74.006,
                ),
                100,
                new Date('2024-12-02T12:30:24.124Z'),
              ),
            ),
          },
        },
      ],
    }).compile();

    invoicesController = module.get<InvoicesController>(InvoicesController);
    getInvoiceByIdUseCase = module.get<GetInvoiceByIdUseCase>(GetInvoiceByIdUseCase);
  });

  it('should return an invoice for a given ID', async () => {
    const result = await invoicesController.getInvoiceById(1);

    // Normalizar las fechas para ignorar diferencias menores
    const normalizeDate = (date: Date) => new Date(Math.floor(date.getTime() / 1000) * 1000);

    expect({
      ...result,
      generatedAt: normalizeDate(result.generatedAt),
      trip: {
        ...result.trip,
        startTime: normalizeDate(result.trip.startTime),
      },
    }).toEqual({
      id: 1,
      amount: 100,
      generatedAt: normalizeDate(new Date('2024-12-02T12:30:24.124Z')),
      trip: {
        id: 1,
        passenger: null,
        driver: null,
        status: TripStatus.ACTIVE,
        startLatitude: 40.7128,
        startLongitude: -74.006,
        endLatitude: undefined,
        endLongitude: undefined,
        fare: undefined,
        startTime: normalizeDate(new Date('2024-12-02T12:30:24.124Z')),
        endTime: null,
      },
    });
  });
});
