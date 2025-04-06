import request from 'supertest';
import app from '../src/server';

describe('Dashboard API', () => {
  it('deve retornar totais do cliente com status 200', async () => {
    const res = await request(app).get('/dashboard/totals/7202210726');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalEnergyConsumed');
  });

  it('deve retornar erro de validação com clientNumber inválido', async () => {
    const res = await request(app).get('/dashboard/totals/123');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
