import {errorHandler} from "../utils/errorHandler";
import {Room} from "../models/Room";

export async function createRoom(req: any, res: any) {
  console.log(req);
  // try {
  //   const room = await Room.create(req.body, req.body.usersIds);
  //   await room.save();
  //   res.status(200).json(await room.getData());
  // } catch (e) {
  //   errorHandler(res, e);
  // }
}
