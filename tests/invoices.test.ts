import request from 'supertest';
import app from '../src/server';

describe('Invoices API', () => {
  it('deve retornar uma fatura válida com status 200', async () => {
    const res = await request(app).get('/invoices/7202210726/JAN-2024');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('referenceMonth');
    expect(res.body).toHaveProperty('energyConsumed');
  });

  it('deve retornar 404 para fatura inexistente', async () => {
    const res = await request(app).get('/invoices/0000000000/JAN-1900');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('deve retornar erro de validação com clientNumber inválido', async () => {
    const res = await request(app).get('/invoices/123/JAN-2024');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /invoices/history/:clientNumber', () => {
  it('deve retornar histórico de faturas com status 200', async () => {
    const res = await request(app).get('/invoices/history/7202210726');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('referenceMonth');
  });

  it('deve retornar 404 se cliente não existir', async () => {
    const res = await request(app).get('/invoices/history/9999999999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('deve retornar 400 se clientNumber for inválido', async () => {
    const res = await request(app).get('/invoices/history/123');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
