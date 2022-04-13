import Category from "./model";

export default class CategoryService {
  public addCategory = async (input: any) => {
    return await Category.create(input);
  };

  public findCategoriesByOptions = async (options: any = {}) => {
    return await Category.findAll(options);
  };

  public findCategoryByOptions = async (options: any) => {
    return await Category.findOne(options);
  };
  public findCategoryById = async (id: number) => {
    return await Category.findByPk(id);
  };
}
