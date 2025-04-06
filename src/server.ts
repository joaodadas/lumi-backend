import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(cors());
app.use(bodyParser.json());
setupSwagger(app);
app.use(routes);
app.use(errorHandler);

export default app;
