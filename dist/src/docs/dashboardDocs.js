"use strict";
/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Indicadores e totais agregados de consumo
 */
/**
 * @swagger
 * /dashboard/totals/{clientNumber}:
 *   get:
 *     summary: Retorna os totais do dashboard do cliente
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: clientNumber
 *         required: true
 *         schema:
 *           type: string
 *           example: "7202210726"
 *     responses:
 *       200:
 *         description: Totais agregados retornados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalEnergyConsumed:
 *                   type: number
 *                   example: 1542.75
 *                 totalCompensatedEnergy:
 *                   type: number
 *                   example: 322.5
 *                 totalValueWithoutGD:
 *                   type: number
 *                   example: 1234.89
 *                 totalGDSavings:
 *                   type: number
 *                   example: 187.40
 */
/**
 * @swagger
 * /dashboard/monthly/{clientNumber}:
 *   get:
 *     summary: Retorna a evolução mensal do cliente
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: clientNumber
 *         required: true
 *         schema:
 *           type: string
 *           example: "7202210726"
 *     responses:
 *       200:
 *         description: Dados mensais retornados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   referenceMonth:
 *                     type: string
 *                     example: "JAN-2024"
 *                   totalEnergyConsumption:
 *                     type: number
 *                     example: 180.2
 *                   totalValueWithoutGD:
 *                     type: number
 *                     example: 210.5
 *                   gdSavings:
 *                     type: number
 *                     example: 30.0
 */
