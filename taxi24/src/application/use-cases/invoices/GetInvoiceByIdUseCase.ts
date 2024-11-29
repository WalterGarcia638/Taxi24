// src/application/use-cases/invoices/GetInvoiceByIdUseCase.ts
import { InvoiceRepository } from '../../ports/InvoiceRepository';
import { Invoice } from '../../../domain/entities/Invoice';

export class GetInvoiceByIdUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(id: number): Promise<Invoice | null> {
    return await this.invoiceRepository.findById(id);
  }
}
