import { getCustomRepository, getRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import CreateCategoryService from './CreateCategoryService';

interface TransactionDataDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: TransactionDataDTO): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);

    const categoryObject = await categoryRepository.findOne(
      { where: { title: category } }
    );

    const newCategory = new CreateCategoryService();

    const { id: category_id } = categoryObject ?
      categoryObject :
      await newCategory.execute(category);

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id,
    });

    transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
