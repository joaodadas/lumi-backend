"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InvoiceController_1 = require("../controllers/InvoiceController");
const DashboardController_1 = require("../controllers/DashboardController");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const validateRequest_1 = require("../middlewares/validateRequest");
const invoiceParamsSchema_1 = require("../schemas/invoiceParamsSchema");
const clientNumberParamSchema_1 = require("../schemas/clientNumberParamSchema");
const router = (0, express_1.Router)();
// Definindo a especificação do Swagger
const swaggerSpec = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Faturas de Energia',
            version: '1.0.0',
            description: 'API para gerenciar e acessar faturas de energia elétrica',
        },
    },
    apis: ['./src/routes/*.ts'], // Caminho para os arquivos que contêm a documentação das rotas
});
router.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Instanciando controladores
const invoiceController = new InvoiceController_1.InvoiceController();
const dashboardController = new DashboardController_1.DashboardController();
router.get('/invoices/history/:clientNumber', (0, validateRequest_1.validateRequestParams)(clientNumberParamSchema_1.clientNumberParamSchema), (req, res) => invoiceController.getHistory(req, res));
// Rota para extrair e salvar todas as faturas automaticamente dos PDFs
router.post('/invoices/extract-all', (req, res) => invoiceController.extractAllInvoices(req, res));
// Rota para listar todas as faturas
router.get('/invoices', (req, res) => invoiceController.listInvoices(req, res));
/**
 * @swagger
 * /invoices/{clientNumber}/{referenceMonth}:
 *   get:
 *     summary: Retorna fatura específica de um cliente em um mês
 *     parameters:
 *       - in: path
 *         name: clientNumber
 *         required: true
 *         schema:
 *           type: string
 *           example: 7202210726
 *       - in: path
 *         name: referenceMonth
 *         required: true
 *         schema:
 *           type: string
 *           example: JAN-2024
 *     responses:
 *       200:
 *         description: Fatura encontrada
 *       404:
 *         description: Fatura não encontrada
 */
// Rota para consultar fatura específica por cliente e mês
router.get('/invoices/:clientNumber/:referenceMonth', (0, validateRequest_1.validateRequestParams)(invoiceParamsSchema_1.invoiceParamsSchema), (req, res) => invoiceController.getInvoice(req, res));
// Rota para download de fatura em PDF
router.get('/invoices/download/:clientNumber/:referenceMonth', (0, validateRequest_1.validateRequestParams)(invoiceParamsSchema_1.invoiceParamsSchema), (req, res) => invoiceController.downloadInvoice(req, res));
// Rota para consultar totais do dashboard por cliente
router.get('/dashboard/totals/:clientNumber', (0, validateRequest_1.validateRequestParams)(clientNumberParamSchema_1.clientNumberParamSchema), (req, res) => dashboardController.getDashboardTotals(req, res));
// Rota para evolução mensal do cliente (para gráficos, etc)
router.get('/dashboard/monthly/:clientNumber', (0, validateRequest_1.validateRequestParams)(clientNumberParamSchema_1.clientNumberParamSchema), (req, res) => dashboardController.getMonthlyEvolution(req, res));
exports.default = router;
