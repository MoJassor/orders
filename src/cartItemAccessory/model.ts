import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface CartItemAccessoryAttributes {
  id: number;
  partQuantity: number;
  partPrice: number;
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
  public partQuantity!: number;
  public partPrice!: number;
}

CartItemAccessory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    partQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    partPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "cartItemAccessory",
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
