import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const ensureAccountsJsonIsCreated = async (request, response, next) => {
  const initialJson = {
    nextId: 1,
    accounts: []
  }
  
  try {
    await readFile(global.fileName);
  } catch (err) {
    await writeFile(global.fileName, JSON.stringify(initialJson));
    global.logger('`accounts.json` file created!');
  }

  next();
}

export default ensureAccountsJsonIsCreated;
