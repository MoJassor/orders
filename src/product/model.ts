import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface ProductAttributes {
  id: number;
  price: number;
  quantity: number;
  name: string;
  description: string;
  image_url: string;
  is_visible: boolean;
  deletedAt?: Date;
}
export interface ProductInput extends Optional<ProductAttributes, "id"> {}
export interface ProductOutput extends Required<ProductAttributes> {}

export default class Product
  extends Model<ProductAttributes, ProductInput>
  implements ProductAttributes
{
  public id!: number;
  public description!: string;
  public name!: string;
  public image_url!: string;
  public quantity!: number;
  public price!: number;
  public is_visible!: boolean;
}

Product.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(225),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(225),
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "product",
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
