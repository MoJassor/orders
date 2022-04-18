import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  password: string;
  phone: string;
  is_manager: boolean;
  deletedAt?: Date;
}
export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

export default class User
  extends Model<UserAttributes, UserInput>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public password!: string;
  public phone!: string;
  public is_manager!: boolean;
}

User.init(
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
      validate: {
        isAlpha: { msg: "The name should be a set of letters just" },
      },
    },
    password: {
      type: DataTypes.STRING(225),
      allowNull: false,
      validate: {
        min: 15,
      },
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          msg: "The phone number should be 10 to 14 characters",
          args: [10, 14],
        },
        isNumeric: {
          msg: "The phone number should be a set of numbers",
        },
      },
    },
    is_manager: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "phone" }],
      },
    ],
  }
);
