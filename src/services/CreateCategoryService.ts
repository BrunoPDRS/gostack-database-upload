import { getRepository } from "typeorm";
import Category from "../models/Category";

class CreateCategoryService {
  public async execute(title: string) {
    const categoryRepo = getRepository(Category);

    const category = categoryRepo.create({
      title,
    });

    await categoryRepo.save(category);

    return category;
  }
}

export default CreateCategoryService;
