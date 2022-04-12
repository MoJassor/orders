import Product from "./model";
import Category from "../category/model";
import Accessory from "../accessory/model";

export default class ProductService {
  public addProduct = async (input: any) => {
    return await Product.create(input);
  };

  public findProductsByOptions = async (options: any = {}) => {
    return await Product.findAll({
      ...options,
      include: {
        model: Category,
        as: "category",
        attributes: ["title", "image_url"],
      },
    });
  };

  public findProductByOptions = async (options: any) => {
    return await Product.findOne(options);
  };

  public findProductById = async (_id: number) => {
    return await Product.findByPk(_id, {
      include: { model: Accessory, as: "accessories" },
    });
  };
}
