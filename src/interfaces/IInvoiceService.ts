import { Invoice as PrismaInvoice } from '@prisma/client';
import { SaveInvoiceDTO } from '../dtos/SaveInvoiceDTO';

export interface IInvoiceService {
  getAllInvoices(): Promise<PrismaInvoice[]>;
  getInvoiceByClientAndMonth(
    clientNumber: string,
    referenceMonth: string
  ): Promise<PrismaInvoice | null>;
  getClientHistory(clientNumber: string): Promise<PrismaInvoice[]>;
  getClientByClientNumber(clientNumber: string): Promise<any>;
  getInvoiceFilePath(
    clientNumber: string,
    referenceMonth: string
  ): Promise<string>;
  saveInvoice(invoice: SaveInvoiceDTO): Promise<PrismaInvoice | null>;
}
