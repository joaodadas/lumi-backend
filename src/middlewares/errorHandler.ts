import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('💥 Erro capturado:', err);

  const statusCode = err.status || 500;
  const message = err.message || 'Erro interno no servidor';

  res.status(statusCode).json({ error: message });
}
