import {Request, Response} from "express";
import {errorHandler} from "../utils/errorHandler";
import {Message, TGetForPeriod, TMessage} from "../models/Message";

export async function createMessage(req: any, res: any) {
  console.log(req, res);
  // try {
  //   const message = await Message.create(req.body);
  //   await message.save();
  //   res.status(200).json(await message.getData());
  // } catch (e) {
  //   errorHandler(res, e);
  // }
}

export async function getMessages(req: Request<any, any, TGetForPeriod>, res: Response) {
  try {
    const messages = await Message.getForPeriod(req.body);
    res.status(200).json(messages);
  } catch (e) {
    errorHandler(res, e);
  }
}
