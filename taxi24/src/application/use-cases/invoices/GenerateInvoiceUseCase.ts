// src/application/use-cases/invoices/GenerateInvoiceUseCase.ts
import { InvoiceRepository } from '../../ports/InvoiceRepository';
import { Trip } from '../../../domain/entities/Trip';
import { Invoice } from '../../../domain/entities/Invoice';

export class GenerateInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(trip: Trip): Promise<Invoice> {
    const amount = this.calculateAmount(trip);
    const invoice = new Invoice(0, trip, amount);
    return await this.invoiceRepository.createInvoice(invoice);
  }

  private calculateAmount(trip: Trip): number {
    // Implementa la lógica para calcular el monto de la factura
    return trip.fare || 0;
  }
}
