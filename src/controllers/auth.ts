import {Request, Response} from "express";
import {compareSync, genSaltSync, hashSync} from "bcryptjs";
import {sign} from "jsonwebtoken";
import {errorHandler} from "../utils/errorHandler";
import keys from "../config/keys";
import {IUser, User} from "../models/User";


export async function login(req: Request<any, any, IUser>, res: Response) {

  const profile = await User.findOne({
    where: {phone: req.body.phone}
  });

  if (!profile) {
    return res.status(404).json({
      message: "Пользователь с таким email не найден"
    });
  }

  const isPasswordMatch = compareSync(req.body.password, profile.getDataValue("password"));

  if (!isPasswordMatch) {
    return res.status(401).json({
      massage: "Неверный пароль"
    });
  }

  const data = profile.get({plain: true});
  delete data.password;

  const token = sign(
    {
      id: data.id
    },
    keys.jwt,
    {
      expiresIn: 3600
    });
  res.status(200).json({
    token: `Bearer ${token}`,
    ...data
  });
}

export async function register(req: Request<any, any, IUser>, res: Response) {

  const profile = await User.findOne({
    where: {phone: req.body.phone}
  });

  if (profile) {
    return res.status(409).json({
      message: "Пользователь с таким телефоном уже существует"
    });
  }

  const salt = genSaltSync(10);

  const user = await User.create({
    name: req.body.name,
    surname: req.body.surname,
    patronymic: req.body.patronymic,
    email: req.body.email,
    phone: req.body.phone,
    password: hashSync(req.body.password, salt)
  });

  const data = user.get({plain: true});
  delete  data.password;

  try {
    await user.save();
    res.status(201).json(data);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function edit(req: Request<any, any, IUser>, res: Response) {

  const profile = await User.findByPk(req.body.id);

  if (!profile) {
    return res.status(409).json({
      message: "Пользователь не найден"
    });
  }

  try {
    await profile.update({
      name: req.body.name,
      surname: req.body.surname,
      patronymic: req.body.patronymic,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    });
    const data = profile.get({plain: true});
    delete data.password;
    res.status(201).json(data);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getProfile(req: Request<any, any, IUser>, res: Response) {

  const profile = await User.findByPk(req.body.id);

  if (!profile) {
    return res.status(409).json({
      message: "Пользователь не найден"
    });
  }

  try {
    const data = profile.get({plain: true});
    delete data.password;
    res.status(201).json(data);
  } catch (error) {
    errorHandler(res, error);
  }
}
