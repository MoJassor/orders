import CartItem from "./model";

export default class CartItemService {
  public addCartItem = async (input: any) => {
    return await CartItem.create(input);
  };

  public findCartItemsByOptions = async (options: any = {}) => {
    return await CartItem.findAll(options);
  };

  public findCartItemByOptions = async (options: any) => {
    return await CartItem.findOne(options);
  };
  public findCartItemById = async (_id: number) => {
    return await CartItem.findById(_id);
  };
  public updateCartItemInfo = async (_id: string, options: any) => {
    return await CartItem.findByIdAndUpdate(_id, options);
  };
}
