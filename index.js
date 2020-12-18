import express from 'express';
import winston from 'winston';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import ensureAccountsJsonIsCreated from './middlewares/ensureAccountsJsonIsCreated.js';
import accountsRouter from './routes/accounts.routes.js';
import { swaggerDocument } from './doc.js'

const { combine, timestamp, label, printf } = winston.format;
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.fileName = 'accounts.json'
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'bank-api.log' }),
  ],
  format: combine(
    label({ label: 'bank-api' }),
    timestamp(),
    logFormat
  )
});

const app = express();

app.use(express.json());
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/account', ensureAccountsJsonIsCreated, accountsRouter);

app.listen(3000, async () => logger.info('Server started on port 3000!'));