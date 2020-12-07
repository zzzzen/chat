import {Request, Response} from 'express';
import {compareSync, genSaltSync, hashSync} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import {User} from '../models/User';
import {errorHandler} from '../utils/errorHandler';
import keys from '../config/keys';
import {LoginReq} from '../interfaces/ajax';


export async function login(request: Request, res: Response): Promise<void> {

  const req = request as LoginReq;
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    const passwordResult = compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      const token = sign({
        email: candidate.email,
        userId: candidate._id
      },
      keys.jwt,
      {
        expiresIn: 3600
      });
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        massage: 'Неверный пароль'
      })
    }
  } else {
    res.status(404).json({
      message: 'Пользователь с таким email не найден'
    })
  }
}

export async function register(request: Request, res: Response): Promise<void> {

  const req = request as LoginReq;
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    res.status(409).json({
      message: 'Пользователь с таким email уже существует'
    })
  } else {
    const salt = genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: hashSync(password, salt)
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      errorHandler(res, error)
    }
  }
}
