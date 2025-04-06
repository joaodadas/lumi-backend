"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardApplication = void 0;
const DashboardRepository_1 = require("../repositories/DashboardRepository");
class DashboardApplication {
    repository;
    constructor() {
        this.repository = new DashboardRepository_1.DashboardRepository();
    }
    async getTotals(clientNumber) {
        const result = await this.repository.getTotalsByClientNumber(clientNumber);
        return {
            totalEnergyConsumed: (result._sum.energyConsumed ?? 0) + (result._sum.energySCEEE ?? 0),
            totalCompensatedEnergy: result._sum.compensatedEnergy ?? 0,
            totalValueWithoutGD: (result._sum.energyConsumedValue ?? 0) +
                (result._sum.energySCEEValue ?? 0) +
                (result._sum.publicLightingValue ?? 0),
            totalGDSavings: result._sum.gdSavings ?? 0,
        };
    }
    async getMonthlyEvolution(clientNumber) {
        const monthly = await this.repository.getMonthlyEvolutionByClientNumber(clientNumber);
        return monthly.map((month) => ({
            referenceMonth: month.referenceMonth,
            totalEnergyConsumption: month._sum.totalEnergyConsumption ?? 0,
            totalValueWithoutGD: month._sum.totalValueWithoutGD ?? 0,
            gdSavings: month._sum.gdSavings ?? 0,
        }));
    }
}
exports.DashboardApplication = DashboardApplication;
