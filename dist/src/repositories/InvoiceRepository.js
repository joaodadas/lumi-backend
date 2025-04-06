"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRepository = void 0;
// src/repositories/InvoiceRepository.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class InvoiceRepository {
    async findAll() {
        return await prisma.invoice.findMany({
            include: { client: true },
        });
    }
    async findByClientAndMonth(clientNumber, referenceMonth) {
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
    async findClientByClientNumber(clientNumber) {
        return prisma.client.findFirst({
            where: { clientNumber },
        });
    }
    async findHistoryByClient(clientNumber) {
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
    async getFilePath(clientNumber, referenceMonth) {
        const folder = `Instalacao_${clientNumber}`;
        const filename = `${clientNumber}-${referenceMonth}.pdf`;
        return `Faturas/${folder}/${filename}`;
    }
    async save(invoiceData) {
        const { clientNumber, installationNumber, referenceMonth, ...rest } = invoiceData;
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
exports.InvoiceRepository = InvoiceRepository;
