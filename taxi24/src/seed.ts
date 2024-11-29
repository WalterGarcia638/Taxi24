// src/seed.ts
import { createConnection, getRepository } from 'typeorm';
import { DriverEntity } from './infrastructure/entities/DriverEntity';
import * as faker from 'faker';
import { PassengerEntity } from './infrastructure/entities/Passenger';
import { TripEntity } from './infrastructure/entities/Trip';
import { InvoiceEntity } from './infrastructure/entities/Invoice';

export async function seedData() {
  // Establecer conexión con la base de datos
  const connection = await createConnection();

  // Obtener repositorios
  const driverRepo = getRepository(DriverEntity);
  const passengerRepo = getRepository(PassengerEntity);
  const tripRepo = getRepository(TripEntity);
  const invoiceRepo = getRepository(InvoiceEntity);

  // Seed para Drivers
  const driversData = [];
  for (let i = 0; i < 50; i++) {
    driversData.push({
      name: faker.name.firstName(),
      latitude: parseFloat(faker.address.latitude(40.70, 40.80, 6)),
      longitude: parseFloat(faker.address.longitude(-74.00, -74.10, 6)),
      status: faker.random.arrayElement(['available', 'unavailable']),
    });
  }
  const drivers = await driverRepo.save(driversData);

  // Seed para Passengers
  const passengersData = [];
  for (let i = 0; i < 100; i++) {
    passengersData.push({
      name: faker.name.firstName(),
    });
  }
  const passengers = await passengerRepo.save(passengersData);

  // Seed para Trips
  const tripsData = [];
  for (let i = 0; i < 200; i++) {
    const passenger = passengers[Math.floor(Math.random() * passengers.length)];
    const driver = drivers[Math.floor(Math.random() * drivers.length)];
    const startTime = faker.date.past();
    const endTime = faker.date.between(startTime, new Date());
    const fare = parseFloat(faker.finance.amount(10, 100, 2));

    const trip = {
      passenger: passenger,
      driver: driver,
      status: 'completed',
      startTime: startTime,
      endTime: endTime,
      startLatitude: parseFloat(faker.address.latitude(40.70, 40.80, 6)),
      startLongitude: parseFloat(faker.address.longitude(-74.00, -74.10, 6)),
      endLatitude: parseFloat(faker.address.latitude(40.70, 40.80, 6)),
      endLongitude: parseFloat(faker.address.longitude(-74.00, -74.10, 6)),
      fare: fare,
    };
    tripsData.push(trip);
  }
  const trips = await tripRepo.save(tripsData);

  // Seed para Invoices
  const invoicesData = trips.map(trip => ({
    trip: trip,
    amount: trip.fare,
    issuedAt: faker.date.between(trip.endTime, new Date()),
  }));

  await invoiceRepo.save(invoicesData);

  // Cerrar conexión
  await connection.close();
}

// Ejecutar el seed si se llama directamente
if (require.main === module) {
  seedData()
    .then(() => {
      console.log('Seeding completado.');
    })
    .catch(error => {
      console.error('Error al realizar el seeding:', error);
    });
}
