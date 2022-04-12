import database from "../database/database";
import { DataTypes } from "sequelize";

const CartItemAccessory = database.define(
  "cartItem_accessory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);
export default CartItemAccessory;
