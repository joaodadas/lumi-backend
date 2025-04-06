"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceParamsSchema = void 0;
const zod_1 = require("zod");
exports.invoiceParamsSchema = zod_1.z.object({
    clientNumber: zod_1.z.string().min(8, 'Deve ter pelo menos 8 dígitos'),
    referenceMonth: zod_1.z.string().regex(/^[A-Z]{3}-\d{4}$/, {
        message: 'Formato inválido. Use: MES-ANO (ex: JAN-2024)',
    }),
});
