import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TripStatus } from 'src/adapters/enums/TripStatus';

export class CreateTripDto {
  @IsNotEmpty()
  @IsNumber()
  passengerId: number;

  @IsNotEmpty()
  @IsNumber()
  driverId: number;

  @IsNotEmpty()
  @IsNumber()
  startLatitude: number;

  @IsNotEmpty()
  @IsNumber()
  startLongitude: number;

  @IsOptional()
  @IsString()
  status?: TripStatus; // El estado es opcional
}
