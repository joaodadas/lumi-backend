"use strict";
/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Operações relacionadas às faturas
 */
/**
 * @swagger
 * /invoices/history/{clientNumber}:
 *   get:
 *     summary: Lista o histórico de faturas de um cliente
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: clientNumber
 *         required: true
 *         description: Número do cliente
 *         schema:
 *           type: string
 *           example: "7202210726"
 *     responses:
 *       200:
 *         description: Lista de faturas do cliente
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
 *                   totalValueWithoutGD:
 *                     type: number
 *                     example: 230.55
 *       404:
 *         description: Nenhuma fatura encontrada
 */
/**
 * @swagger
 * /invoices/extract-all:
 *   post:
 *     summary: Extrai e salva todas as faturas dos PDFs da pasta `Faturas/`
 *     tags: [Invoices]
 *     responses:
 *       201:
 *         description: Extração concluída
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Extração concluída."
 *                 total:
 *                   type: number
 *                   example: 24
 *       500:
 *         description: Erro ao processar arquivos
 */
/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Lista todas as faturas salvas no banco
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Faturas listadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   clientNumber:
 *                     type: string
 *                     example: "7202210726"
 *                   referenceMonth:
 *                     type: string
 *                     example: "JAN-2024"
 */
/**
 * @swagger
 * /invoices/{clientNumber}/{referenceMonth}:
 *   get:
 *     summary: Retorna fatura de um cliente por mês
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: clientNumber
 *         required: true
 *         schema:
 *           type: string
 *           example: "7202210726"
 *       - in: path
 *         name: referenceMonth
 *         required: true
 *         schema:
 *           type: string
 *           example: "JAN-2024"
 *     responses:
 *       200:
 *         description: Fatura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 energyConsumed:
 *                   type: number
 *                   example: 198.4
 *                 totalValueWithoutGD:
 *                   type: number
 *                   example: 212.75
 *       404:
 *         description: Fatura não encontrada
 */
/**
 * @swagger
 * /invoices/download/{clientNumber}/{referenceMonth}:
 *   get:
 *     summary: Baixa o PDF da fatura
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: clientNumber
 *         required: true
 *         schema:
 *           type: string
 *           example: "7202210726"
 *       - in: path
 *         name: referenceMonth
 *         required: true
 *         schema:
 *           type: string
 *           example: "JAN-2024"
 *     responses:
 *       200:
 *         description: PDF da fatura enviado
 *       404:
 *         description: Arquivo não encontrado
 */
