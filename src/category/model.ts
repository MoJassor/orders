import database from "../database/database";
import { DataTypes } from "sequelize";

const Category = database.define(
  "category",
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
  { timestamps: false }
);
export default Category;
