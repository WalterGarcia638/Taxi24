// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Importa las entidades y repositorios
import { DriverEntity } from './infrastructure/entities/DriverEntity';

import { DriverRepositoryImpl } from './infrastructure/repositories/DriverRepositoryImpl';
import { PassengerRepositoryImpl } from './infrastructure/repositories/PassengerRepositoryImpl';
import { TripRepositoryImpl } from './infrastructure/repositories/TripRepositoryImpl';
import { InvoiceRepositoryImpl } from './infrastructure/repositories/InvoiceRepositoryImpl';

// Importa los casos de uso
import { GetAllDriversUseCase } from './application/use-cases/drivers/GetAllDriversUseCase';
import { CreateTripUseCase } from './application/use-cases/trips/CreateTripUseCase';
import { CompleteTripUseCase } from './application/use-cases/trips/CompleteTripUseCase';
import { GetActiveTripsUseCase } from './application/use-cases/trips/GetActiveTripsUseCase'; // Importa este caso de uso
import { GenerateInvoiceUseCase } from './application/use-cases/invoices/GenerateInvoiceUseCase';
import { GetInvoiceByIdUseCase } from './application/use-cases/invoices/GetInvoiceByIdUseCase';
import { GetPassengerByIdUseCase } from './application/use-cases/passengers/GetPassengerByIdUseCase';

// Importa los controladores
import { DriversController } from './adapters/controllers/DriversController';
import { TripsController } from './adapters/controllers/TripsController';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassengerEntity } from './infrastructure/entities/Passenger';
import { TripEntity } from './infrastructure/entities/Trip';
import { InvoiceEntity } from './infrastructure/entities/Invoice';
import { GetAvailableDriversUseCase } from './application/use-cases/drivers/GetAvailableDriversUseCase';
import { GetAvailableDriversNearLocationUseCase } from './application/use-cases/drivers/GetAvailableDriversNearLocationUseCase';
import { InvoicesController } from './adapters/controllers/InvoicesController';
import { PassengersController } from './adapters/controllers/PassengersController';
import { GetAllPassengersUseCase } from './application/use-cases/passengers/GetAllPassengersUseCase';
import { TripRepository } from './application/ports/TripRepository';
import { PassengerRepository } from './application/ports/PassengerRepository';
import { DriverRepository } from './application/ports/DriverRepository';
import { GetDriverByIdUseCase } from './application/use-cases/drivers/GetDriverByIdUseCase';

@Module({
  imports: [
    // Configuración del módulo de configuración
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configuración asíncrona de TypeORM para utilizar variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT', '5432')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [DriverEntity, PassengerEntity, TripEntity, InvoiceEntity],
        synchronize: true, // No usar en producción
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      DriverEntity,
      PassengerEntity,
      TripEntity,
      InvoiceEntity,
    ]),
  ],
  controllers: [DriversController, TripsController, InvoicesController, PassengersController],
  providers: [
    // Repositorios
    { provide: 'DriverRepository', useClass: DriverRepositoryImpl },
    { provide: 'PassengerRepository', useClass: PassengerRepositoryImpl },
    { provide: 'TripRepository', useClass: TripRepositoryImpl },
    { provide: 'InvoiceRepository', useClass: InvoiceRepositoryImpl },
    // Casos de Uso
    {
      provide: GetAllDriversUseCase,
      useFactory: (driverRepo) => new GetAllDriversUseCase(driverRepo),
      inject: ['DriverRepository'],
    },
   /* {
      provide: CreateTripUseCase,
      useFactory: (tripRepo) => new CreateTripUseCase(tripRepo),
      inject: ['TripRepository'],
    },*/
    {
      provide: CreateTripUseCase,
      useFactory: (
        tripRepo: TripRepository,
        passengerRepo: PassengerRepository,
        driverRepo: DriverRepository,
      ) => new CreateTripUseCase(tripRepo, passengerRepo, driverRepo),
      inject: ['TripRepository', 'PassengerRepository', 'DriverRepository'],
    },
    {
      provide: CompleteTripUseCase,
      useFactory: (tripRepo, generateInvoiceUseCase) =>
        new CompleteTripUseCase(tripRepo, generateInvoiceUseCase),
      inject: ['TripRepository', GenerateInvoiceUseCase],
    },
    {
      provide: GetActiveTripsUseCase, // Añade este proveedor
      useFactory: (tripRepo) => new GetActiveTripsUseCase(tripRepo),
      inject: ['TripRepository'],
    },
    /*{
        provide: GenerateInvoiceUseCase,
        useFactory: (invoiceRepo) => new GenerateInvoiceUseCase(invoiceRepo),
        inject: ['InvoiceRepository'],
      },*/
      {
        provide: GenerateInvoiceUseCase,
        useFactory: (invoiceRepo, tripRepo) =>
          new GenerateInvoiceUseCase(invoiceRepo, tripRepo),
        inject: ['InvoiceRepository', 'TripRepository'],
      },
      {
        provide: 'DriverRepository',
        useClass: DriverRepositoryImpl,
      },
      {
        provide: GetAvailableDriversNearLocationUseCase,
        useFactory: (driverRepo) => new GetAvailableDriversNearLocationUseCase(driverRepo),
        inject: ['DriverRepository'],
      },
      {
        provide: GetDriverByIdUseCase,
        useFactory: (driverRepo) => new GetDriverByIdUseCase(driverRepo),
        inject: ['DriverRepository'],
      },

      
      
    {
      provide: 'TripRepository',
      useClass: TripRepositoryImpl,
    },
    {
      provide: 'InvoiceRepository',
      useClass: InvoiceRepositoryImpl,
    },
    {
      provide: GetInvoiceByIdUseCase,
      useFactory: (invoiceRepo) => new GetInvoiceByIdUseCase(invoiceRepo),
      inject: ['InvoiceRepository'],
    },
    {
      provide: GetPassengerByIdUseCase,
      useFactory: (passengerRepo) => new GetPassengerByIdUseCase(passengerRepo),
      inject: ['PassengerRepository'],
    },
    {
      provide: GetAvailableDriversUseCase,
      useFactory: (driverRepo) => new GetAvailableDriversUseCase(driverRepo),
      inject: ['DriverRepository'],
    },
    {
      provide: GetAvailableDriversNearLocationUseCase,
      useFactory: (driverRepo) => new GetAvailableDriversNearLocationUseCase(driverRepo),
      inject: ['DriverRepository'],
    },
    {
      provide: GetAllPassengersUseCase,
      useFactory: (passengerRepo) => new GetAllPassengersUseCase(passengerRepo),
      inject: ['PassengerRepository'],
    },

    // Otros proveedores y casos de uso
  ],
})
export class AppModule {}
