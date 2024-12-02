import { DataSource } from 'typeorm';
import { DriverEntity } from './infrastructure/entities/DriverEntity';
import { PassengerEntity } from './infrastructure/entities/Passenger';

export const seedData = async (dataSource: DataSource) => {
  const driverRepository = dataSource.getRepository(DriverEntity);
  const passengerRepository = dataSource.getRepository(PassengerEntity);

  const drivers = [
    { id: 1, name: 'Alice', latitude: 40.7128, longitude: -74.0060, status: 'available' },
    { id: 2, name: 'Bob', latitude: 40.7138, longitude: -74.0050, status: 'available' },
    { id: 3, name: 'Charlie', latitude: 40.7148, longitude: -74.0040, status: 'unavailable' },
    { id: 4, name: 'David', latitude: 40.7158, longitude: -74.0030, status: 'available' },
    { id: 5, name: 'Eve', latitude: 40.7168, longitude: -74.0020, status: 'unavailable' },
    { id: 6, name: 'Frank', latitude: 40.7178, longitude: -74.0010, status: 'available' },
    { id: 7, name: 'Grace', latitude: 40.7188, longitude: -74.0000, status: 'available' },
    { id: 8, name: 'Heidi', latitude: 40.7198, longitude: -73.9990, status: 'unavailable' },
    { id: 9, name: 'Ivan', latitude: 40.7208, longitude: -73.9980, status: 'available' },
    { id: 10, name: 'Judy', latitude: 40.7218, longitude: -73.9970, status: 'available' },
  ];

  const passengers = [
    { id: 1, name: 'Charlie' },
    { id: 2, name: 'Dana' },
    { id: 3, name: 'Eleanor' },
    { id: 4, name: 'Fred' },
    { id: 5, name: 'Ginny' },
    { id: 6, name: 'Hank' },
    { id: 7, name: 'Ivy' },
    { id: 8, name: 'Jack' },
    { id: 9, name: 'Karen' },
    { id: 10, name: 'Leo' },
  ];


  await driverRepository.delete({});
  await passengerRepository.delete({});


  await driverRepository.save(drivers as DriverEntity[]); 
  await passengerRepository.save(passengers as PassengerEntity[]);

  console.log('Database seeded successfully!');
};
