import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DashboardRepository {
  async getTotalsByClientNumber(clientNumber: string) {
    return prisma.invoice.aggregate({
      where: {
        client: {
          clientNumber,
        },
      },
      _sum: {
        energyConsumed: true,
        energySCEEE: true,
        compensatedEnergy: true,
        energyConsumedValue: true,
        energySCEEValue: true,
        publicLightingValue: true,
        gdSavings: true,
      },
    });
  }

  async getMonthlyEvolutionByClientNumber(clientNumber: string) {
    return prisma.invoice.groupBy({
      by: ['referenceMonth'],
      where: {
        client: {
          clientNumber,
        },
      },
      _sum: {
        totalEnergyConsumption: true,
        totalValueWithoutGD: true,
        gdSavings: true,
      },
      orderBy: {
        referenceMonth: 'asc',
      },
    });
  }
}
