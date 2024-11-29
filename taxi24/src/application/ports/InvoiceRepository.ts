// src/application/ports/InvoiceRepository.ts
import { Invoice } from '../../domain/entities/Invoice';

export interface InvoiceRepository {
  createInvoice(invoice: Invoice): Promise<Invoice>;
  findById(id: number): Promise<Invoice | null>;
}
