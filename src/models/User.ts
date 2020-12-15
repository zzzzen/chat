import {DataTypes, Model, Optional} from "sequelize";
import {db} from "../db";

export const User = db.define<Model<IUser, IUserCreate>>("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING(45),
  surname: DataTypes.STRING(45),
  phone: DataTypes.STRING(45),
  password: DataTypes.STRING(255)
}, {
  timestamps: false
});

export interface IUser {
  id?: number,
  name: string,
  surname: string,
  phone: string,
  password: string
}

type IUserCreate = Optional<IUser, "id">
