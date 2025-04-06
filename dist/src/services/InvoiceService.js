"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const AppError_1 = require("../errors/AppError");
const InvoiceRepository_1 = require("../repositories/InvoiceRepository");
class InvoiceService {
    repository;
    constructor() {
        this.repository = new InvoiceRepository_1.InvoiceRepository();
    }
    async getAllInvoices() {
        return this.repository.findAll();
    }
    async getInvoiceByClientAndMonth(clientNumber, referenceMonth) {
        return this.repository.findByClientAndMonth(clientNumber, referenceMonth);
    }
    async getClientHistory(clientNumber) {
        const invoices = await this.repository.findHistoryByClient(clientNumber);
        console.log('🔍 Histórico retornado:', invoices);
        if (!invoices || invoices.length === 0) {
            throw new AppError_1.AppError(`Fatura não encontrada para o cliente ${clientNumber}`, 404);
        }
        return invoices;
    }
    async getClientByClientNumber(clientNumber) {
        return this.repository.findClientByClientNumber(clientNumber);
    }
    async getInvoiceFilePath(clientNumber, referenceMonth) {
        return this.repository.getFilePath(clientNumber, referenceMonth);
    }
    async saveInvoice(invoice) {
        return this.repository.save(invoice);
    }
}
exports.InvoiceService = InvoiceService;
