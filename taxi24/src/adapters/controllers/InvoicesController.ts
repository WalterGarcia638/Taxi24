// src/interface-adapters/controllers/InvoicesController.ts
import { Controller, Get, Param } from '@nestjs/common';
import { Invoice } from '../../domain/entities/Invoice';
import { GetInvoiceByIdUseCase } from 'src/application/use-cases/invoices/GetInvoiceByIdUseCase';

@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly getInvoiceByIdUseCase: GetInvoiceByIdUseCase,
  ) {}

  @Get(':id')
  async getInvoiceById(@Param('id') id: number): Promise<Invoice | null> {
    return await this.getInvoiceByIdUseCase.execute(id);
  }
}
