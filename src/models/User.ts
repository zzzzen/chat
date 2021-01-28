import {DataTypes, Model, Optional} from "sequelize";
import {db} from "../db";
import {compareSync, genSaltSync, hashSync} from "bcryptjs";
import {sign} from "jsonwebtoken";
import keys from "../config/keys";

type TInstanceMethods = {
  getClientData: () => Omit<IUser, "password">
}

export const USER_CODE_EXISTS = 409;
export const USER_CODE_NOT_FOUND = 400;
export const USER_CODE_UNAUTHORIZED = 401;

export class User {
  static async create(data: IUserCreate) {
    const user = await User.model.findOne({
      where: {phone: data.phone}
    });

    if (user) return USER_CODE_EXISTS;

    const userData: any = {...data};
    const excludeFields = ["id"];
    for (const key in data) {
      if (excludeFields.includes(key)) delete userData[key];
    }
    User._preparePassword(userData);
    const newUser = await User.model.create(userData);
    return User.extendUser(newUser);
  }

  static async update(data: IUserCreate) {
    const user = await User.model.findByPk(data.id);

    if (!user) return USER_CODE_NOT_FOUND;

    const userData: any = {...data};
    const excludeFields = ["id"];
    for (const key in data) {
      if (excludeFields.includes(key)) delete userData[key];
    }
    User._preparePassword(userData);
    const newUser = await user.update(userData);
    return User.extendUser(newUser);
  }

  static async login(phone: string, password: string) {
    const user = await User.model.findOne({
      where: {phone}
    });
    if (!user) return USER_CODE_NOT_FOUND;

    const isPasswordMatch = compareSync(password, user.getDataValue("password"));
    if (!isPasswordMatch) return USER_CODE_UNAUTHORIZED;

    return User.extendUser(user);
  }

  static getToken(id: number) {
    return `Bearer ${sign({id}, keys.jwt, {expiresIn: 3600})}`;
  }

  static extendUser<T>(UserInstance: T): T & TInstanceMethods {
    return Object.assign(UserInstance, User._instanceMethods);
  }

  static model = db.define<Model<IUser, IUserCreate>>("users", {
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
    timestamps: false,
  });

  static _instanceMethods: TInstanceMethods = {
    getClientData: function(this: any){
      const data = this.get({plain: true});
      for (const key in data) {
        if (key === "password" || data[key] === null || data[key] === "") delete data[key];
      }
      return data;
    }
  };

  static _preparePassword(user: any) {
    if (user.password) user.password = hashSync(user.password, genSaltSync(10));
  }
}

export interface IUser {
  id: number,
  name: string,
  surname: string,
  patronymic?: string,
  phone: string,
  avatar?: string,
  email?: string,
  password: string
}

type IUserCreate = Optional<IUser, "id">
