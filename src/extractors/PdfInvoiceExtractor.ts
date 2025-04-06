import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';

export class PdfInvoiceExtractor {
  async extract(filePath: string): Promise<any> {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const lines = data.text.split('\n').map((line) => line.trim());

    console.log(`📄 Processando ${path.basename(filePath)}`);
    console.log('📃 Conteúdo extraído (primeiras 20 linhas):');
    lines.slice(0, 20).forEach((line, index) => {
      console.log(`${index + 1}: ${line}`);
    });

    const referenceIndex = lines.findIndex((line) =>
      line.startsWith('Referente a')
    );
    const referenceLine = lines[referenceIndex + 1];

    const clientIndex = lines.findIndex((line) =>
      line.toUpperCase().includes('CLIENTE')
    );
    const clientLine = lines[clientIndex + 1];
    console.log('🔍 Linha do cliente encontrada:', clientLine);

    const energiaLine = lines.find((line) => line.includes('Energia Elétrica'));
    const sceeLine = lines.find((line) =>
      line.includes('Energia SCEE s/ ICMS')
    );
    const gdLine = lines.find((line) =>
      line.includes('Energia compensada GD I')
    );
    const publicLightLine = lines.find((line) =>
      line.includes('Contrib Ilum Publica Municipal')
    );

    if (
      !clientLine ||
      !referenceLine ||
      !energiaLine ||
      !sceeLine ||
      !gdLine ||
      !publicLightLine
    ) {
      throw new Error(`Erro ao extrair informações do PDF em: ${filePath}`);
    }

    const clientNumberMatch = clientLine?.match(/\d{8,}/g);
    const clientNumber = clientNumberMatch?.[0] || '';
    const installationNumber = path.basename(filePath).split('-')[0];

    if (!clientNumber) {
      throw new Error(
        `Número do cliente não encontrado no arquivo: ${filePath}`
      );
    }

    const parseFloatBr = (val: string) =>
      parseFloat(val.replace('.', '').replace(',', '.'));

    const parseLine = (line: string): [number, number] => {
      const parts = line.split(/\s+/).filter(Boolean);
      const quantity = parseInt(parts.find((p) => /^\d+$/.test(p)) || '0');
      const value = parseFloatBr(parts[parts.length - 1]);
      return [quantity, value];
    };

    const referenceMonth =
      referenceLine.match(/[A-Z]{3}\/\d{4}/)?.[0]?.replace('/', '-') || '';

    const [energyConsumed, energyConsumedValue] = parseLine(energiaLine);
    const [energySCEEE, energySCEEValue] = parseLine(sceeLine);
    const [compensatedEnergy, compensatedEnergyValue] = parseLine(gdLine);
    const publicLightingValue = parseFloatBr(
      publicLightLine.match(/[\d.,]+/)?.[0] || '0'
    );

    const totalEnergyConsumption = energyConsumed + energySCEEE;
    const totalValueWithoutGD =
      energyConsumedValue + energySCEEValue + publicLightingValue;
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

  async extractAllFromDirectory(rootDir: string): Promise<any[]> {
    const results: any[] = [];

    const walk = (dir: string): string[] => {
      const entries = fs.readdirSync(dir);
      let files: string[] = [];

      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        if (fs.statSync(fullPath).isDirectory()) {
          files = files.concat(walk(fullPath));
        } else if (entry.toLowerCase().endsWith('.pdf')) {
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
      } catch (error) {
        console.error(
          `❌ Falha ao processar ${path.basename(filePath)}: ${
            (error as Error).message
          }`
        );
      }
    }

    return results;
  }
}
