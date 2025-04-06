import { Invoice as PrismaInvoice } from '@prisma/client';
import { SaveInvoiceDTO } from '../dtos/SaveInvoiceDTO';

export interface IInvoiceRepository {
  findAll(): Promise<PrismaInvoice[]>;
  findByClientAndMonth(
    clientNumber: string,
    referenceMonth: string
  ): Promise<PrismaInvoice | null>;
  findHistoryByClient(clientNumber: string): Promise<PrismaInvoice[]>;
  findClientByClientNumber(clientNumber: string): Promise<any>; // pode criar um tipo Client depois
  getFilePath(clientNumber: string, referenceMonth: string): Promise<string>;
  save(invoice: SaveInvoiceDTO): Promise<PrismaInvoice | null>;
}
