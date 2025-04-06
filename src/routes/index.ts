import { Router } from 'express';
import { InvoiceController } from '../controllers/InvoiceController';
import { DashboardController } from '../controllers/DashboardController';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {
  validateRequestBody,
  validateRequestParams,
} from '../middlewares/validateRequest';
import { invoiceParamsSchema } from '../schemas/invoiceParamsSchema';
import { clientNumberParamSchema } from '../schemas/clientNumberParamSchema';

const router = Router();

// Definindo a especificação do Swagger
const swaggerSpec = swaggerJSDoc({
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

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Instanciando controladores
const invoiceController = new InvoiceController();
const dashboardController = new DashboardController();

router.get(
  '/invoices/history/:clientNumber',
  validateRequestParams(clientNumberParamSchema),
  (req, res) => invoiceController.getHistory(req, res)
);

// Rota para extrair e salvar todas as faturas automaticamente dos PDFs
router.post('/invoices/extract-all', (req, res) =>
  invoiceController.extractAllInvoices(req, res)
);

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
router.get(
  '/invoices/:clientNumber/:referenceMonth',
  validateRequestParams(invoiceParamsSchema),
  (req, res) => invoiceController.getInvoice(req, res)
);

// Rota para download de fatura em PDF
router.get(
  '/invoices/download/:clientNumber/:referenceMonth',
  validateRequestParams(invoiceParamsSchema),
  (req, res) => invoiceController.downloadInvoice(req, res)
);

// Rota para consultar totais do dashboard por cliente
router.get(
  '/dashboard/totals/:clientNumber',
  validateRequestParams(clientNumberParamSchema),
  (req, res) => dashboardController.getDashboardTotals(req, res)
);

// Rota para evolução mensal do cliente (para gráficos, etc)
router.get(
  '/dashboard/monthly/:clientNumber',
  validateRequestParams(clientNumberParamSchema),
  (req, res) => dashboardController.getMonthlyEvolution(req, res)
);

export default router;
