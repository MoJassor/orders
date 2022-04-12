import database from "../database/database";
import { DataTypes } from "sequelize";

const Cart = database.define(
  "cart",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { timestamps: false }
);
export default Cart;
