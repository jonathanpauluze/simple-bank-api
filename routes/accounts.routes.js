import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();
const { readFile, writeFile } = fs;

router.post('/', async (request, response, next) => {
  try {
    let account = request.body;

    if (!account.name || account.balance === null) {
      throw new Error('`name` and `balance` are required!');
    }
  
    const data = await readFile(global.fileName);
    const parsedData = JSON.parse(data);

    account = { id: parsedData.nextId++, ...account };

    parsedData.accounts.push(account);
  
    await writeFile(global.fileName, JSON.stringify(parsedData));

    logger.info(`${request.method} ${request.baseUrl} - ${JSON.stringify(account)}`);

    return response.json(account);
  } catch(err) {
    next(err);
  }
});

router.get('/', async (request, response, next) => {
  try {
    const data = await readFile(global.fileName);
    const parsedData = JSON.parse(data);

    delete parsedData.nextId;

    logger.info(`${request.method} ${request.originalUrl}`);

    return response.json(parsedData);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await readFile(global.fileName);
    const parsedData = JSON.parse(data);

    const foundAccount = parsedData.accounts.find(account => account.id === Number(id));

    logger.info(`${request.method} ${request.originalUrl}`);

    return response.json(foundAccount);
  } catch(err) {
    next(err);
  }
});

router.put('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, balance } = request.body;

    if (!name || balance === null) {
      throw new Error('`name` and `balance` are required!');
    }

    const data = await readFile(global.fileName);
    const parsedData = JSON.parse(data);

    const foundAccountIndex = parsedData.accounts.findIndex(account => account.id === Number(id));

    if (foundAccountIndex === -1) {
      throw new Error('account id not found!');
    }

    parsedData.accounts[foundAccountIndex] = { ...parsedData.accounts[foundAccountIndex], name, balance }

    writeFile(global.fileName, JSON.stringify(parsedData));

    logger.info(`${request.method} ${request.originalUrl}`);

    return response.json(parsedData.accounts[foundAccountIndex]);
  } catch(err) {
    next(err);
  }
});

router.patch('/:id/update-balance', async (request, response, next) => {
  try {
    const { id } = request.params;
    const { balance } = request.body;

    if (balance === null) {
      throw new Error('`balance` is required!');
    }

    const data = await readFile(global.fileName);
    const parsedData = JSON.parse(data);

    const foundAccountIndex = parsedData.accounts.findIndex(account => account.id === Number(id));

    if (foundAccountIndex === -1) {
      throw new Error('account id not found!');
    }

    parsedData.accounts[foundAccountIndex] = { ...parsedData.accounts[foundAccountIndex], balance }

    writeFile(global.fileName, JSON.stringify(parsedData));

    logger.info(`${request.method} ${request.originalUrl}`);

    return response.json(parsedData.accounts[foundAccountIndex]);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await readFile(global.fileName);
    const parsedData = JSON.parse(data);

    parsedData.accounts = parsedData.accounts.filter(account => account.id !== Number(id));

    await writeFile(global.fileName, JSON.stringify(parsedData));

    logger.info(`${request.method} ${request.originalUrl}`);

    return response.status(204).send();
  } catch(err) {
    next(err);
  }
});

router.use((error, request, response, next) => {
  logger.error(`${request.method} ${request.baseUrl} - ${error.message}`);

  response.status(400).json({ error: error.message });
})

export default router;
