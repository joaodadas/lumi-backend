// src/services/InvoiceService.ts
import { SaveInvoiceDTO } from '../dtos/SaveInvoiceDTO';
import { AppError } from '../errors/AppError';
import { InvoiceRepository } from '../repositories/InvoiceRepository';
import { Invoice as PrismaInvoice } from '@prisma/client';

export class InvoiceService {
  private repository: InvoiceRepository;

  constructor() {
    this.repository = new InvoiceRepository();
  }

  async getAllInvoices(): Promise<PrismaInvoice[]> {
    return this.repository.findAll();
  }

  async getInvoiceByClientAndMonth(
    clientNumber: string,
    referenceMonth: string
  ): Promise<PrismaInvoice | null> {
    return this.repository.findByClientAndMonth(clientNumber, referenceMonth);
  }

  async getClientHistory(clientNumber: string) {
    const invoices = await this.repository.findHistoryByClient(clientNumber);
    console.log('🔍 Histórico retornado:', invoices);

    if (!invoices || invoices.length === 0) {
      throw new AppError(
        `Fatura não encontrada para o cliente ${clientNumber}`,
        404
      );
    }

    return invoices;
  }

  async getClientByClientNumber(clientNumber: string) {
    return this.repository.findClientByClientNumber(clientNumber);
  }

  async getInvoiceFilePath(
    clientNumber: string,
    referenceMonth: string
  ): Promise<string> {
    return this.repository.getFilePath(clientNumber, referenceMonth);
  }

  async saveInvoice(invoice: SaveInvoiceDTO): Promise<PrismaInvoice | null> {
    return this.repository.save(invoice);
  }
}
