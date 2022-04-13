import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface CartItemAttributes {
  id: number;
  quantity: number;
  price: number;
  deletedAt?: Date;
}
export interface CartItemInput extends Optional<CartItemAttributes, "id"> {}
export interface CartItemOutput extends Required<CartItemAttributes> {}

export default class CartItem
  extends Model<CartItemAttributes, CartItemInput>
  implements CartItemAttributes
{
  public id!: number;
  public quantity!: number;
  public price!: number;
}

CartItem.init(
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
  {
    tableName: "cartItem",
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
