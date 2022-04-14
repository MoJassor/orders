import CartItem from "../cartItem/model";
import CartItemAccessory from "../cartItemAccessory/model";
import Cart from "./model";
import Product from "../product/model";
import Accessory from "../accessory/model";
import Sequelize from "sequelize";

export default class CartService {
  public addCart = async (input: any) => {
    return await Cart.create(input);
  };

  public findCartsByOptions = async (options: any = {}) => {
    return await Cart.findAll(options);
  };

  public findCartByOptions = async (options: any) => {
    return await Cart.findOne(options);
  };

  public findCartByPk = async (id: number) => {
    return await Cart.findByPk(id);
  };
}
