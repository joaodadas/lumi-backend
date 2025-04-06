import { DashboardRepository } from '../repositories/DashboardRepository';

export class DashboardApplication {
  private repository: DashboardRepository;

  constructor() {
    this.repository = new DashboardRepository();
  }

  async getTotals(clientNumber: string) {
    const result = await this.repository.getTotalsByClientNumber(clientNumber);

    return {
      totalEnergyConsumed:
        (result._sum.energyConsumed ?? 0) + (result._sum.energySCEEE ?? 0),
      totalCompensatedEnergy: result._sum.compensatedEnergy ?? 0,
      totalValueWithoutGD:
        (result._sum.energyConsumedValue ?? 0) +
        (result._sum.energySCEEValue ?? 0) +
        (result._sum.publicLightingValue ?? 0),
      totalGDSavings: result._sum.gdSavings ?? 0,
    };
  }

  async getMonthlyEvolution(clientNumber: string) {
    const monthly = await this.repository.getMonthlyEvolutionByClientNumber(
      clientNumber
    );

    return monthly.map((month) => ({
      referenceMonth: month.referenceMonth,
      totalEnergyConsumption: month._sum.totalEnergyConsumption ?? 0,
      totalValueWithoutGD: month._sum.totalValueWithoutGD ?? 0,
      gdSavings: month._sum.gdSavings ?? 0,
    }));
  }
}
