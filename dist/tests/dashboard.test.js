"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
describe('Dashboard API', () => {
    it('deve retornar totais do cliente com status 200', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/dashboard/totals/7202210726');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('totalEnergyConsumed');
    });
    it('deve retornar erro de validação com clientNumber inválido', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/dashboard/totals/123');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
