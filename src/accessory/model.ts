import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface AccessoryAttributes {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  deletedAt?: Date;
}
export interface AccessoryInput extends Optional<AccessoryAttributes, "id"> {}
export interface AccessoryOutput extends Required<AccessoryAttributes> {}

export default class Accessory
  extends Model<AccessoryAttributes, AccessoryInput>
  implements AccessoryAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public image_url!: string;
  public price!: number;
}

Accessory.init(
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
  },
  {
    tableName: "accessory",
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
