"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const InvoiceService_1 = require("../services/InvoiceService");
const InvoiceExtractionApplication_1 = require("../application/InvoiceExtractionApplication");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class InvoiceController {
    service;
    extractorService;
    constructor() {
        this.service = new InvoiceService_1.InvoiceService();
        this.extractorService = new InvoiceExtractionApplication_1.InvoiceExtractionApplication();
    }
    normalize(text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    async extractAllInvoices(req, res) {
        try {
            const invoices = await this.extractorService.extractAllFromFolder();
            res.status(201).json({
                message: 'Extração concluída.',
                total: invoices.length,
                invoices,
            });
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message });
        }
    }
    async listInvoices(req, res) {
        try {
            const invoices = await this.service.getAllInvoices();
            res.status(200).json(invoices);
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message });
        }
    }
    async getInvoice(req, res) {
        const { clientNumber, referenceMonth } = req.params;
        try {
            const invoice = await this.service.getInvoiceByClientAndMonth(clientNumber, referenceMonth);
            if (!invoice) {
                res.status(404).json({ error: 'Fatura não encontrada.' });
                return;
            }
            // Aqui você garante que o TypeScript aceite o tipo
            res.status(200).json(invoice);
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message });
        }
    }
    async downloadInvoice(req, res) {
        try {
            const { clientNumber, referenceMonth } = req.params;
            // Busca o cliente para obter o número da instalação
            const client = await this.service.getClientByClientNumber(clientNumber);
            console.log('🔎 CLIENTE ENCONTRADO:', client);
            if (!client || !client.installationNumber) {
                res.status(404).json({ error: 'Cliente não encontrado.' });
                return;
            }
            const installationNumber = client.installationNumber;
            const monthMap = {
                JAN: '01',
                FEV: '02',
                MAR: '03',
                ABR: '04',
                MAI: '05',
                JUN: '06',
                JUL: '07',
                AGO: '08',
                SET: '09',
                OUT: '10',
                NOV: '11',
                DEZ: '12',
            };
            const [monthStr, year] = referenceMonth.split('-');
            const numericMonth = monthMap[monthStr.toUpperCase()] || monthStr;
            // Aplica normalização no nome da pasta
            const folderName = this.normalize(`Instalação_${installationNumber}`);
            const fileName = `${installationNumber}-${numericMonth}-${year}.pdf`;
            const basePath = path_1.default.join(__dirname, '../../Faturas');
            const filePath = path_1.default.join(basePath, folderName, fileName);
            console.log('📄 Procurando arquivo em:', filePath);
            if (!fs_1.default.existsSync(filePath)) {
                res.status(404).json({ error: 'Arquivo não encontrado.' });
                return;
            }
            await new Promise((resolve, reject) => {
                res.download(filePath, fileName, (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message });
        }
    }
    async getHistory(req, res) {
        const { clientNumber } = req.params;
        try {
            console.log('🚀 Rota /invoices/history chamada para:', clientNumber);
            const history = await this.service.getClientHistory(clientNumber);
            res.status(200).json(history);
        }
        catch (error) {
            const err = error;
            console.log('aqui');
            res.status(404).json({ error: err.message });
        }
    }
}
exports.InvoiceController = InvoiceController;
