import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';

import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  fileName: string;
}

class ImportTransactionsService {
  async execute({ fileName }: Request): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const csvPath = path.resolve(__dirname, '..', '..', 'tmp', fileName);

    const readCSV = fs.createReadStream(csvPath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSV.pipe(parseStream);

    const transactions: Transaction[] = [];

    await new Promise(resolve => {
      parseCSV.on('data', async transaction => {
        const [title, type, value, category] = transaction;

        const transObject = {
          title,
          type,
          value,
          category,
        };

        const createdTransaction = await createTransaction.execute(transObject);

        transactions.push(createdTransaction);
      })
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    return transactions;
  }
}

export default ImportTransactionsService;
