import Transaction from '../models/Transaction';

import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import CreateTransactionService from './CreateTransactionService';

interface CSV {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const readCSV = fs.createReadStream(filePath);

    const parseStream = csvParse({
      from_line: 2,
    });

    const parseCSV = readCSV.pipe(parseStream);

    const transactData: CSV[] = [];

    const transactions: Transaction[] = [];

    parseCSV.on('data', async transaction => {
      const [title, type, value, category] = transaction.map(
        (cell: string) => cell.trim(),
      );

      if (!title || !type || !value) return;

      transactData.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    for (const transaction of transactData) {
      const createdTransact = await createTransaction.execute(transaction);
      transactions.push(createdTransact);
    }
    
    return transactions;
  }
}

export default ImportTransactionsService;
