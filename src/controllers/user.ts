import {Request, Response} from "express";
import {errorHandler} from "../utils/errorHandler";
import {IUser, User, USER_CODE_EXISTS, USER_CODE_NOT_FOUND, USER_CODE_UNAUTHORIZED} from "../models/User";
import {UserRoom} from "../models/UserRoom";


export async function login(req: Request<any, any, IUser>, res: Response) {
  const statusOrUser = await User.login(req.body.phone, req.body.password);

  switch (statusOrUser) {
  case USER_CODE_NOT_FOUND:
    return res.status(200).json({
      message: "User not found"
    });

  case USER_CODE_UNAUTHORIZED:
    return res.status(USER_CODE_UNAUTHORIZED).json({
      message: "Wrong password"
    });

  default: {
    try {
      const data = statusOrUser.getClientData();
      res.status(200).json({
        ...data, token: User.getToken(data.id)
      });
    } catch (e) {
      errorHandler(res, e);
    }
  }
  }
}

export async function register(req: Request<any, any, IUser>, res: Response) {
  const statusOrUser = await User.create(req.body);

  switch (statusOrUser) {
  case USER_CODE_EXISTS:
    return res.status(USER_CODE_EXISTS).json({
      message: "User is already exist"
    });

  default: {
    const data = statusOrUser.getClientData();
    try {
      await statusOrUser.save();
      res.status(201).json({token: User.getToken(data.id), ...data});
    } catch (error) {
      errorHandler(res, error);
    }
  }
  }

}

export async function edit(req: Request<any, any, IUser>, res: Response) {
  const statusOrUser = await User.update(req.body);

  switch (statusOrUser) {
  case USER_CODE_NOT_FOUND:
    return res.status(USER_CODE_NOT_FOUND).json({
      message: "User not found"
    });

  default: {
    const data = statusOrUser.getClientData();
    try {
      await statusOrUser.save();
      res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  }
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

export async function getRooms(req: Request<any, any, {id: number}>, res: Response) {
  try {
    const rooms = await UserRoom.getUserRooms(req.body.id);
    res.status(200).json(rooms);
  } catch (e) {
    errorHandler(res, e);
  }
}
