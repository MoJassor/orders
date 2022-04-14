import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface CartAttributes {
  id: number;
  deletedAt?: Date;
  address: string;
  statuesId?: number;
  totalPrice?: number;
}
export interface CartInput extends Optional<CartAttributes, "id"> {}
export interface CartOutput extends Required<CartAttributes> {}

export default class Cart
  extends Model<CartAttributes, CartInput>
  implements CartAttributes
{
  public id!: number;
  public address!: string;
  public totalPrice!: number;
}

Cart.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "cart",
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
