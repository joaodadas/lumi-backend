import { Request, Response } from 'express';
import { InvoiceService } from '../services/InvoiceService';
import { InvoiceExtractionApplication } from '../application/InvoiceExtractionApplication';
import { Invoice as PrismaInvoice } from '@prisma/client';
import path from 'path';
import fs from 'fs';

export class InvoiceController {
  private service: InvoiceService;
  private extractorService: InvoiceExtractionApplication;

  constructor() {
    this.service = new InvoiceService();
    this.extractorService = new InvoiceExtractionApplication();
  }

  private normalize(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  async extractAllInvoices(req: Request, res: Response): Promise<void> {
    try {
      const invoices = await this.extractorService.extractAllFromFolder();
      res.status(201).json({
        message: 'Extração concluída.',
        total: invoices.length,
        invoices,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }

  async listInvoices(req: Request, res: Response): Promise<void> {
    try {
      const invoices = await this.service.getAllInvoices();
      res.status(200).json(invoices);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }

  async getInvoice(req: Request, res: Response): Promise<void> {
    const { clientNumber, referenceMonth } = req.params;
    try {
      const invoice = await this.service.getInvoiceByClientAndMonth(
        clientNumber,
        referenceMonth
      );

      if (!invoice) {
        res.status(404).json({ error: 'Fatura não encontrada.' });
        return;
      }

      // Aqui você garante que o TypeScript aceite o tipo
      res.status(200).json(invoice as PrismaInvoice);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }

  async downloadInvoice(req: Request, res: Response): Promise<void> {
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

      const monthMap: Record<string, string> = {
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
      const basePath = path.join(__dirname, '../../public/Faturas');
      const filePath = path.join(basePath, folderName, fileName);

      console.log('🧩 Caminho final resolvido:', filePath);
      console.log(
        '📁 Arquivos disponíveis:',
        fs.readdirSync(path.dirname(filePath))
      );

      if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: 'Arquivo não encontrado.' });
        return;
      }

      await new Promise<void>((resolve, reject) => {
        res.download(filePath, fileName, (err: Error) => {
          if (err) reject(err);
          else resolve();
        });
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }

  async getHistory(req: Request, res: Response): Promise<void> {
    const { clientNumber } = req.params;

    try {
      console.log('🚀 Rota /invoices/history chamada para:', clientNumber);
      const history = await this.service.getClientHistory(clientNumber);
      res.status(200).json(history);
    } catch (error) {
      const err = error as Error;
      console.log('aqui');
      res.status(404).json({ error: err.message });
    }
  }
}
