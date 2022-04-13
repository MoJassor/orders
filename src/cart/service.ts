import CartItem from "../cartItem/model";
import CartItemAccessory from "../cartItemAccessory/model";
import Cart from "./model";
import Product from "../product/model";
import Accessory from "../accessory/model";

export default class CartService {
  public addCart = async (input: any) => {
    return await Cart.create(input);
  };

  public findCartsByOptions = async (options: any = {}) => {
    return await Cart.findAll({
      ...options,
      include: {
        model: CartItem,
        as: "cartItem",
        attributes: ["id", "price", "quantity"],
        paranoid: false,
        include: [
          {
            model: CartItemAccessory,
            as: "productParts",
            attributes: ["id", "price", "quantity"],
            paranoid: false,
            include: { model: Accessory, as: "accessory", paranoid: false },
          },
          {
            model: Product,
            as: "product",
            paranoid: false,
            attributes: ["id", "name", "image_url"],
          },
        ],
      },
    });
  };

  public findCartByOptions = async (options: any) => {
    return await Cart.findOne(options);
  };

  public findCartById = async (id: number, options: any = {}) => {
    return await Cart.findOne({
      where: { id, ...options },
      include: {
        model: CartItem,
        as: "cartItem",
        attributes: ["id", "price", "quantity"],
        include: [
          {
            model: CartItemAccessory,
            as: "productParts",
            attributes: ["id", "price", "quantity"],
            include: [{ model: Accessory, as: "accessory" }],
          },
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "image_url"],
          },
        ],
      },
    });
  };
}
