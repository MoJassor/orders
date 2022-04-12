import database from "../database/database";
import { DataTypes } from "sequelize";

const Accessory = database.define(
  "accessory",
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
  { timestamps: false }
);
export default Accessory;
