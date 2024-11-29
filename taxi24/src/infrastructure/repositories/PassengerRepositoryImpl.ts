// src/infrastructure/repositories/PassengerRepositoryImpl.ts
import { PassengerRepository } from '../../application/ports/PassengerRepository';
import { Passenger } from '../../domain/entities/Passenger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassengerEntity } from '../entities/Passenger';

@Injectable()
export class PassengerRepositoryImpl implements PassengerRepository {
  constructor(
    @InjectRepository(PassengerEntity)
    private passengerRepository: Repository<PassengerEntity>,
  ) {}

  async findAll(): Promise<Passenger[]> {
    const entities = await this.passengerRepository.find();
    return entities.map(entity => this.toDomain(entity));
  }

  async findById(id: number): Promise<Passenger | null> {
    const entity = await this.passengerRepository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  private toDomain(entity: PassengerEntity): Passenger {
    return new Passenger(entity.id, entity.name);
  }
}
