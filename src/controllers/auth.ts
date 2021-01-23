import {Request, Response} from "express";
import {compareSync} from "bcryptjs";
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

  if (req.body.id) delete req.body.id;
  const user = await User.create(req.body);

  const data = user.get({plain: true});
  delete  data.password;

  try {
    await user.save();
    const token = sign({id: data.id}, keys.jwt, {expiresIn: 3600});
    res.status(201).json({
      token: `Bearer ${token}`,
      ...data
    });
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

  // @ts-ignore
  if (req.user.id !== req.body.id) {
    return res.status(400).json({
      message: "Пользователь не может редактировать чужой профиль"
    });
  }

  try {
    delete req.body.id;
    await profile.update(req.body);
    const data = profile.get({plain: true});
    delete data.password;
    res.status(201).json(data);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getProfile(req: Request, res: Response) {
  const user = req.user as IUser;

  try {
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
}
