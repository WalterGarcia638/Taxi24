import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { TripStatus } from 'src/adapters/enums/TripStatus';

export class UpdateTripDto {
 
  @ApiProperty({ example: 40.7128, description: 'Ending latitude of the trip' })
  @IsNumber()
  @IsOptional()
  endLatitude?: number;

  @ApiProperty({ example: -74.0060, description: 'Ending longitude of the trip' })
  @IsNumber()
  @IsOptional()
  endLongitude?: number;

  @ApiProperty({ example: 50.75, description: 'Fare amount for the trip' })
  @IsNumber()
  @IsOptional()
  fare?: number;
}
