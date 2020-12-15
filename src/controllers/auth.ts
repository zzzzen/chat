import {Request, Response} from "express";
import {compareSync, genSaltSync, hashSync} from "bcryptjs";
import {sign} from "jsonwebtoken";
import {errorHandler} from "../utils/errorHandler";
import keys from "../config/keys";
import {IUser, User} from "../models/User";


export async function login(req: Request<any, any, IUser>, res: Response) {

  const candidate = await User.findOne({
    where: {phone: req.body.phone}
  });

  if (candidate) {
    const passwordResult = compareSync(req.body.password, candidate.getDataValue("password"));
    if (passwordResult) {
      const token = sign({
        phone: candidate.getDataValue("phone"),
        id: candidate.getDataValue("id")
      },
      keys.jwt,
      {
        expiresIn: 3600
      });
      res.status(200).json({
        token: `Bearer ${token}`
      });
    } else {
      res.status(401).json({
        massage: "Неверный пароль"
      });
    }
  } else {
    res.status(404).json({
      message: "Пользователь с таким email не найден"
    });
  }
}

export async function register(req: Request<any, any, IUser>, res: Response) {

  const candidate = await User.findOne({
    where: {phone: req.body.phone}
  });

  if (candidate) {
    res.status(409).json({
      message: "Пользователь с таким email уже существует"
    });
  } else {
    const salt = genSaltSync(10);
    const user = await User.create({
      name: req.body.name,
      surname: req.body.password,
      phone: req.body.phone,
      password: hashSync(req.body.password, salt)
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      errorHandler(res, error);
    }
  }
}
