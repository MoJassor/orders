import Accessory from "./model";
import Product from "../product/model";

export default class AccessoryService {
  public addAccessory = async (input: any) => {
    return await Accessory.create(input);
  };

  public findAccessoriesByOptions = async (options: any = {}) => {
    return await Accessory.findAll({
      ...options,
      include: {
        model: Product,
        as: "product",
      },
    });
  };

  public findAccessoryByOptions = async (options: any) => {
    return await Accessory.findOne(options);
  };
  public findAccessoryById = async (_id: number) => {
    return await Accessory.findByPk(_id);
  };
}
