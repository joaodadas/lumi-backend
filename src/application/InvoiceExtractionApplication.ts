// src/application/InvoiceExtractionApplication.ts
import { PdfInvoiceExtractor } from '../extractors/PdfInvoiceExtractor';
import { InvoiceService } from '../services/InvoiceService';
import path from 'path';
import fs from 'fs';

export class InvoiceExtractionApplication {
  private extractor = new PdfInvoiceExtractor();
  private invoiceService = new InvoiceService();

  async extractAllFromFolder(): Promise<any[]> {
    const baseFolder = path.join(__dirname, '../../Faturas');
    const results: any[] = [];

    const clientFolders = fs.readdirSync(baseFolder);
    for (const folder of clientFolders) {
      const fullFolderPath = path.join(baseFolder, folder);

      if (!fs.statSync(fullFolderPath).isDirectory()) continue;

      const files = fs.readdirSync(fullFolderPath);
      for (const file of files) {
        const filePath = path.join(fullFolderPath, file);

        try {
          const data = await this.extractor.extract(filePath);

          if (!data.clientNumber) {
            console.warn(`⚠️ Ignorado: clientNumber vazio em ${filePath}`);
            continue;
          }

          const invoice = await this.invoiceService.saveInvoice(data);
          results.push(invoice);
        } catch (err) {
          console.error(
            `❌ Falha ao processar ${file}:`,
            (err as Error).message
          );
        }
      }
    }

    return results;
  }
}
