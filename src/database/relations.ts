import Cart from "../cart/model";
import CartItem from "../cartItem/model";
import Category from "../category/model";
import Product from "../product/model";
import Accessory from "../accessory/model";
import User from "../user/model";
import Statues from "../status/model";
import CartItemAccessory from "../cartItemAccessory/model";

export default () => {
  Cart.belongsTo(User, { as: "user" });
  Cart.belongsTo(Statues, { as: "statues" });

  CartItem.belongsTo(Product, { as: "product" });

  CartItem.belongsTo(Cart, { as: "cart", foreignKey: "cartId" });

  Cart.hasMany(CartItem, { as: "cartItem", foreignKey: "cartId" });

  CartItemAccessory.belongsTo(Accessory, { as: "accessory", foreignKey: "id" });

  CartItemAccessory.belongsTo(CartItem, { as: "cartItem" });

  CartItem.hasMany(CartItemAccessory, {
    as: "productParts",
    foreignKey: "cartItemId",
  });

  Accessory.belongsTo(Product, { as: "product" });

  Product.belongsTo(Category, { as: "category" });

  Product.hasMany(Accessory, { as: "accessories", foreignKey: "id" });
};
