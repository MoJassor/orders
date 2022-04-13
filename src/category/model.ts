import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface CategoryAttributes {
  id: number;
  title: string;
  image_url: string;
  is_visible: boolean;
  deletedAt?: Date;
}
export interface CategoryInput extends Optional<CategoryAttributes, "id"> {}
export interface CategoryOutput extends Required<CategoryAttributes> {}

export default class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  public id!: number;
  public title!: string;
  public image_url!: string;
  public is_visible!: boolean;
}

Category.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    image_url: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    is_visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "category",
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
