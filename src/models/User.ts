import {DataTypes, Model, Optional} from "sequelize";
import {db} from "../db";

export const User = db.define<Model<IUser, IUserCreate>>("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  patronymic: DataTypes.STRING(45),
  phone: {
    type: DataTypes.STRING(15),
    unique: true,
    allowNull: false
  },
  avatar: DataTypes.STRING(255),
  email: {
    type: DataTypes.STRING(45),
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: false
});

export interface IUser {
  id?: number,
  name: string,
  surname: string,
  patronymic?: string,
  phone: number,
  avatar?: string,
  email?: string,
  password: string
}

type IUserCreate = Optional<IUser, "id">
