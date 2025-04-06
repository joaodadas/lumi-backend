import { DashboardTotalsDTO } from '../dtos/DashboardTotalsDTO';
import { MonthlyEvolutionDTO } from '../dtos/MonthlyEvolutionDTO';

export interface IDashboardService {
  getTotals(clientNumber: string): Promise<DashboardTotalsDTO>;
  getMonthlyEvolution(clientNumber: string): Promise<MonthlyEvolutionDTO[]>;
}
