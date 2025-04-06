"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DashboardRepository {
    async getTotalsByClientNumber(clientNumber) {
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
    async getMonthlyEvolutionByClientNumber(clientNumber) {
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
exports.DashboardRepository = DashboardRepository;
