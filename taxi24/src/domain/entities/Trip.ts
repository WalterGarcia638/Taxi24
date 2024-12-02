import { TripStatus } from 'src/adapters/enums/TripStatus';
import { Driver } from './Driver';
import { Passenger } from './Passenger';

export class Trip {
  constructor(
    public id: number | null,
    public passenger: Passenger,
    public driver: Driver,
    public status: TripStatus,
    public startTime: Date = new Date(),
    public endTime?: Date,
    public startLatitude?: number,
    public startLongitude?: number,
    public endLatitude?: number,
    public endLongitude?: number,
    public fare?: number,
  ) {}
}
