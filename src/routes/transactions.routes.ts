import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepo = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepo.find();
  const balance = await transactionsRepo.getBalance();

  const transactionsData = {
    transactions,
    balance,
  };

  return response.json(transactionsData);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const deleteTransaction = new DeleteTransactionService();
  const id = request.params.id;

  await deleteTransaction.execute(id);

  return response.status(204).send();
});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {
  const importTransactions = new ImportTransactionsService();

  const newTransactions = await importTransactions.execute(
    request.file.path,
  );

  return response.send(newTransactions);
});

export default transactionsRouter;
