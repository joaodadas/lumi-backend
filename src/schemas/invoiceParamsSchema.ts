import { z } from 'zod';

export const invoiceParamsSchema = z.object({
  clientNumber: z.string().min(8, 'Deve ter pelo menos 8 dígitos'),
  referenceMonth: z.string().regex(/^[A-Z]{3}-\d{4}$/, {
    message: 'Formato inválido. Use: MES-ANO (ex: JAN-2024)',
  }),
});
