"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceExtractionApplication = void 0;
// src/application/InvoiceExtractionApplication.ts
const PdfInvoiceExtractor_1 = require("../extractors/PdfInvoiceExtractor");
const InvoiceService_1 = require("../services/InvoiceService");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class InvoiceExtractionApplication {
    extractor = new PdfInvoiceExtractor_1.PdfInvoiceExtractor();
    invoiceService = new InvoiceService_1.InvoiceService();
    async extractAllFromFolder() {
        const baseFolder = path_1.default.join(__dirname, '../../Faturas');
        const results = [];
        const clientFolders = fs_1.default.readdirSync(baseFolder);
        for (const folder of clientFolders) {
            const fullFolderPath = path_1.default.join(baseFolder, folder);
            if (!fs_1.default.statSync(fullFolderPath).isDirectory())
                continue;
            const files = fs_1.default.readdirSync(fullFolderPath);
            for (const file of files) {
                const filePath = path_1.default.join(fullFolderPath, file);
                try {
                    const data = await this.extractor.extract(filePath);
                    if (!data.clientNumber) {
                        console.warn(`⚠️ Ignorado: clientNumber vazio em ${filePath}`);
                        continue;
                    }
                    const invoice = await this.invoiceService.saveInvoice(data);
                    results.push(invoice);
                }
                catch (err) {
                    console.error(`❌ Falha ao processar ${file}:`, err.message);
                }
            }
        }
        return results;
    }
}
exports.InvoiceExtractionApplication = InvoiceExtractionApplication;
