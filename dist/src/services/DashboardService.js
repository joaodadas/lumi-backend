"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const DashboardApplication_1 = require("../application/DashboardApplication");
class DashboardService {
    app;
    constructor() {
        this.app = new DashboardApplication_1.DashboardApplication();
    }
    async getTotals(clientNumber) {
        return this.app.getTotals(clientNumber);
    }
    async getMonthlyEvolution(clientNumber) {
        return this.app.getMonthlyEvolution(clientNumber);
    }
}
exports.DashboardService = DashboardService;
