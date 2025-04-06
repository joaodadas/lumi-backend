"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const DashboardService_1 = require("../services/DashboardService");
class DashboardController {
    service;
    constructor() {
        this.service = new DashboardService_1.DashboardService();
    }
    async getDashboardTotals(req, res) {
        try {
            const { clientNumber } = req.params;
            const totals = await this.service.getTotals(clientNumber);
            res.status(200).json(totals);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getMonthlyEvolution(req, res) {
        try {
            const { clientNumber } = req.params;
            const data = await this.service.getMonthlyEvolution(clientNumber);
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.DashboardController = DashboardController;
