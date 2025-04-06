import { DashboardApplication } from '../application/DashboardApplication';
import { IDashboardService } from '../interfaces/IDashboardService';

export class DashboardService implements IDashboardService {
  private app: DashboardApplication;

  constructor() {
    this.app = new DashboardApplication();
  }

  async getTotals(clientNumber: string) {
    return this.app.getTotals(clientNumber);
  }

  async getMonthlyEvolution(clientNumber: string) {
    return this.app.getMonthlyEvolution(clientNumber);
  }
}
