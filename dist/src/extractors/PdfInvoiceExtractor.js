"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfInvoiceExtractor = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
class PdfInvoiceExtractor {
    async extract(filePath) {
        const dataBuffer = fs_1.default.readFileSync(filePath);
        const data = await (0, pdf_parse_1.default)(dataBuffer);
        const lines = data.text.split('\n').map((line) => line.trim());
        console.log(`📄 Processando ${path_1.default.basename(filePath)}`);
        console.log('📃 Conteúdo extraído (primeiras 20 linhas):');
        lines.slice(0, 20).forEach((line, index) => {
            console.log(`${index + 1}: ${line}`);
        });
        const referenceIndex = lines.findIndex((line) => line.startsWith('Referente a'));
        const referenceLine = lines[referenceIndex + 1];
        const clientIndex = lines.findIndex((line) => line.toUpperCase().includes('CLIENTE'));
        const clientLine = lines[clientIndex + 1];
        console.log('🔍 Linha do cliente encontrada:', clientLine);
        const energiaLine = lines.find((line) => line.includes('Energia Elétrica'));
        const sceeLine = lines.find((line) => line.includes('Energia SCEE s/ ICMS'));
        const gdLine = lines.find((line) => line.includes('Energia compensada GD I'));
        const publicLightLine = lines.find((line) => line.includes('Contrib Ilum Publica Municipal'));
        if (!clientLine ||
            !referenceLine ||
            !energiaLine ||
            !sceeLine ||
            !gdLine ||
            !publicLightLine) {
            throw new Error(`Erro ao extrair informações do PDF em: ${filePath}`);
        }
        const clientNumberMatch = clientLine?.match(/\d{8,}/g);
        const clientNumber = clientNumberMatch?.[0] || '';
        const installationNumber = path_1.default.basename(filePath).split('-')[0];
        if (!clientNumber) {
            throw new Error(`Número do cliente não encontrado no arquivo: ${filePath}`);
        }
        const parseFloatBr = (val) => parseFloat(val.replace('.', '').replace(',', '.'));
        const parseLine = (line) => {
            const parts = line.split(/\s+/).filter(Boolean);
            const quantity = parseInt(parts.find((p) => /^\d+$/.test(p)) || '0');
            const value = parseFloatBr(parts[parts.length - 1]);
            return [quantity, value];
        };
        const referenceMonth = referenceLine.match(/[A-Z]{3}\/\d{4}/)?.[0]?.replace('/', '-') || '';
        const [energyConsumed, energyConsumedValue] = parseLine(energiaLine);
        const [energySCEEE, energySCEEValue] = parseLine(sceeLine);
        const [compensatedEnergy, compensatedEnergyValue] = parseLine(gdLine);
        const publicLightingValue = parseFloatBr(publicLightLine.match(/[\d.,]+/)?.[0] || '0');
        const totalEnergyConsumption = energyConsumed + energySCEEE;
        const totalValueWithoutGD = energyConsumedValue + energySCEEValue + publicLightingValue;
        const gdSavings = compensatedEnergyValue;
        return {
            clientNumber,
            installationNumber,
            referenceMonth,
            energyConsumed,
            energyConsumedValue,
            energySCEEE,
            energySCEEValue,
            compensatedEnergy,
            compensatedEnergyValue,
            publicLightingValue,
            totalEnergyConsumption,
            totalValueWithoutGD,
            gdSavings,
        };
    }
    async extractAllFromDirectory(rootDir) {
        const results = [];
        const walk = (dir) => {
            const entries = fs_1.default.readdirSync(dir);
            let files = [];
            for (const entry of entries) {
                const fullPath = path_1.default.join(dir, entry);
                if (fs_1.default.statSync(fullPath).isDirectory()) {
                    files = files.concat(walk(fullPath));
                }
                else if (entry.toLowerCase().endsWith('.pdf')) {
                    files.push(fullPath);
                }
            }
            return files;
        };
        const allPdfPaths = walk(rootDir);
        for (const filePath of allPdfPaths) {
            try {
                const invoice = await this.extract(filePath);
                if (!invoice.clientNumber) {
                    console.warn(`🚫 Ignorado: clientNumber vazio em ${filePath}`);
                    continue;
                }
                results.push(invoice);
            }
            catch (error) {
                console.error(`❌ Falha ao processar ${path_1.default.basename(filePath)}: ${error.message}`);
            }
        }
        return results;
    }
}
exports.PdfInvoiceExtractor = PdfInvoiceExtractor;
