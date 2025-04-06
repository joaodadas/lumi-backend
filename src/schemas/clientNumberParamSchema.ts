import { z } from 'zod';

export const clientNumberParamSchema = z.object({
  clientNumber: z
    .string()
    .min(8, 'O número do cliente deve ter pelo menos 8 dígitos'),
});
