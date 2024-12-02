// src/interface-adapters/controllers/InvoicesController.ts
import { Controller, Get, Param } from '@nestjs/common';
import { Invoice } from '../../domain/entities/Invoice';
import { GetInvoiceByIdUseCase } from 'src/application/use-cases/invoices/GetInvoiceByIdUseCase';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';


@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly getInvoiceByIdUseCase: GetInvoiceByIdUseCase,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the invoice' })
  async getInvoiceById(@Param('id') id: number): Promise<Invoice | null> {
    return await this.getInvoiceByIdUseCase.execute(id);
  }
}
