import sequelizeConnection from "../database/database";

import { DataTypes, Model, Optional } from "sequelize";

interface StatusAttributes {
  id: number;
  title: string;
}
export interface StatusInput extends Optional<StatusAttributes, "id"> {}
export interface StatusOutput extends Required<StatusAttributes> {}

export default class Status
  extends Model<StatusAttributes, StatusInput>
  implements StatusAttributes
{
  public id!: number;
  public title!: string;
}

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "status",
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);
