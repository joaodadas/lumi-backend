import { Request, Response } from 'express';
import { DashboardService } from '../services/DashboardService';

export class DashboardController {
  private service: DashboardService;

  constructor() {
    this.service = new DashboardService();
  }

  async getDashboardTotals(req: Request, res: Response): Promise<void> {
    try {
      const { clientNumber } = req.params;
      const totals = await this.service.getTotals(clientNumber);
      res.status(200).json(totals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMonthlyEvolution(req: Request, res: Response): Promise<void> {
    try {
      const { clientNumber } = req.params;
      const data = await this.service.getMonthlyEvolution(clientNumber);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
