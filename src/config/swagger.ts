import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export function setupSwagger(app: Express) {
  const swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Faturas de Energia',
        version: '1.0.0',
        description: 'API para extração e visualização de faturas',
      },
    },
    apis: ['./src/routes/*.ts', './src/docs/*.ts'],
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
