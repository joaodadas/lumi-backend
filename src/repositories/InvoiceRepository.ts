// src/repositories/InvoiceRepository.ts
import { PrismaClient } from '@prisma/client';
import { IInvoiceRepository } from '../interfaces/IInvoiceRepository';
const prisma = new PrismaClient();

export class InvoiceRepository implements IInvoiceRepository {
  async findAll() {
    return await prisma.invoice.findMany({
      include: { client: true },
    });
  }

  async findByClientAndMonth(clientNumber: string, referenceMonth: string) {
    return await prisma.invoice.findFirst({
      where: {
        client: {
          clientNumber,
        },
        referenceMonth,
      },
      include: { client: true },
    });
  }

  async findClientByClientNumber(clientNumber: string) {
    return prisma.client.findFirst({
      where: { clientNumber },
    });
  }

  async findHistoryByClient(clientNumber: string) {
    return prisma.invoice.findMany({
      where: {
        client: {
          clientNumber,
        },
      },
      orderBy: {
        referenceMonth: 'asc',
      },
      include: {
        client: true,
      },
    });
  }

  async getFilePath(
    clientNumber: string,
    referenceMonth: string
  ): Promise<string> {
    const folder = `Instalacao_${clientNumber}`;
    const filename = `${clientNumber}-${referenceMonth}.pdf`;
    return `Faturas/${folder}/${filename}`;
  }

  async save(invoiceData: any) {
    const { clientNumber, installationNumber, referenceMonth, ...rest } =
      invoiceData;

    if (!clientNumber || !installationNumber || !referenceMonth) {
      console.warn(`⚠️ Dados incompletos ignorados:`, {
        clientNumber,
        installationNumber,
        referenceMonth,
      });
      return null;
    }

    const client = await prisma.client.upsert({
      where: { clientNumber },
      update: { installationNumber },
      create: { clientNumber, installationNumber },
    });

    const exists = await prisma.invoice.findFirst({
      where: {
        clientId: client.id,
        referenceMonth,
      },
    });

    if (exists) {
      console.log(`⚠️ Fatura já existe: ${clientNumber} - ${referenceMonth}`);
      return exists;
    }

    return prisma.invoice.create({
      data: {
        ...rest,
        referenceMonth,
        clientId: client.id,
      },
    });
  }
}
