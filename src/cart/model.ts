import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface CartAttributes {
  id: number;
  deletedAt?: Date;
}
export interface CartInput extends Optional<CartAttributes, "id"> {}
export interface CartOutput extends Required<CartAttributes> {}

export default class Cart
  extends Model<CartAttributes, CartInput>
  implements CartAttributes
{
  public id!: number;
}

Cart.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
