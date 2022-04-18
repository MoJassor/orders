import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface CartItemAttributes {
  id: number;
  productQuantity: number;
  productPrice: number;
  deletedAt?: Date;
}
export interface CartItemInput extends Optional<CartItemAttributes, "id"> {}
export interface CartItemOutput extends Required<CartItemAttributes> {}

export default class CartItem
  extends Model<CartItemAttributes, CartItemInput>
  implements CartItemAttributes
{
  public id!: number;
  public productQuantity!: number;
  public productPrice!: number;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },

    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "cartItem",
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
