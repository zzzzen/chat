import {Request, Response} from "express";
import {errorHandler} from "../utils/errorHandler";
import {Room, TRoom} from "../models/Room";

export async function createRoom(req: Request<any, any, TRoom & {usersIds: number[]}>, res: Response) {
  try {
    const room = await Room.create(req.body, req.body.usersIds);
    await room.save();
    res.status(200).json(await room.getData());
  } catch (e) {
    errorHandler(res, e);
  }
}
