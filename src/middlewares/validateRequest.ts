import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequestParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      res.status(400).json({
        error: 'Parâmetros inválidos',
        details: result.error.format(),
      });
      return;
    }

    req.params = result.data;
    next();
  };
};

export const validateRequestBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Body inválido',
        details: result.error.format(),
      });
      return;
    }

    req.body = result.data;
    next();
  };
};
