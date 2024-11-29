// src/domain/entities/Invoice.ts
import { Trip } from './Trip';

export class Invoice {
  constructor(
    public id: number,
    public trip: Trip,
    public amount: number,
    public generatedAt: Date = new Date(),
  ) {}
}
