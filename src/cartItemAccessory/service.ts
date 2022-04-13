import CartItemAccessory from "./model";

export default class CartItemAccessoryService {
  public addCartItemAccessory = async (input: any) => {
    return await CartItemAccessory.create(input);
  };

  public findCartItemAccessoriesByOptions = async (options: any = {}) => {
    return await CartItemAccessory.findAll(options);
  };

  public findCartItemAccessoryByOptions = async (options: any) => {
    return await CartItemAccessory.findOne(options);
  };
  public findCartItemAccessoryById = async (_id: number) => {
    return await CartItemAccessory.findByPk(_id);
  };
}
