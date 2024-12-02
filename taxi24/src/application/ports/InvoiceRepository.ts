import { Invoice } from '../../domain/entities/Invoice';

export interface InvoiceRepository {
  createInvoice(invoice: Invoice): Promise<Invoice>;
  findById(id: number): Promise<Invoice | null>;
  findByTripId(tripId: number): Promise<Invoice | null>; 
}
