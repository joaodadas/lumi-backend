"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const PdfInvoiceExtractor_1 = require("../../src/extractors/PdfInvoiceExtractor");
const extractor = new PdfInvoiceExtractor_1.PdfInvoiceExtractor();
describe('PdfInvoiceExtractor', () => {
    it('deve extrair dados corretamente de um PDF de exemplo', async () => {
        const filePath = path_1.default.resolve(__dirname, '../__mocks__/invoice-sample.pdf');
        const result = await extractor.extract(filePath);
        expect(result).toHaveProperty('clientNumber');
        expect(result).toHaveProperty('referenceMonth');
        expect(result).toHaveProperty('energyConsumed');
        expect(result).toHaveProperty('totalEnergyConsumption');
        expect(result).toHaveProperty('gdSavings');
    });
});
