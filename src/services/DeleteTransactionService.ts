import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<Transaction> {
    const transactionRepo = getCustomRepository(TransactionsRepository);

    const transaction = await transactionRepo.findOne({ where: { id } });

    if (!transaction) {
      throw new AppError('Transaction does not exist.');
    }

    const deletedTransaction = await transactionRepo.remove(transaction);

    return deletedTransaction;
  }
}

export default DeleteTransactionService;
