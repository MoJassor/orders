import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface CartItemAccessoryAttributes {
  id: number;
  quantity: number;
  price: number;
  deletedAt?: Date;
}
export interface CartItemAccessoryInput
  extends Optional<CartItemAccessoryAttributes, "id"> {}
export interface CartItemAccessoryOutput
  extends Required<CartItemAccessoryAttributes> {}

export default class CartItemAccessory
  extends Model<CartItemAccessoryAttributes, CartItemAccessoryInput>
  implements CartItemAccessoryAttributes
{
  public id!: number;
  public quantity!: number;
  public price!: number;
}

CartItemAccessory.init(
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
    tableName: "cartItemAccessory",
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
