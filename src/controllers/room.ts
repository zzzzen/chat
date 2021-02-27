import {Room, ROOM_NOT_FOUND, TRoom} from "../models/Room";
import {Socket} from "socket.io";
import {IUser} from "../models/User";
import {UserRoom} from "../models/UserRoom";
import {events} from "../middlewares/websocket";
import {Message, TMessage} from "../models/Message";

export type TCreateRoomReq = TRoom & {usersIds: number[]}
export async function createRoom(socket: Socket, user: IUser, req: TCreateRoomReq) {
  const room = await Room.create(req, req.usersIds);
  await room.save();
  socket.emit(events.roomFetch, await room.getData());
}

export type TGetRoomReq = {roomId: number}
export async function getRoom(socket: Socket, user: IUser, req: TGetRoomReq) {
  const room = await Room.getData(req.roomId);
  socket.emit(events.roomFetch, room === ROOM_NOT_FOUND ? {
    code: ROOM_NOT_FOUND,
    message: "Not found"
  } : room);
}

export async function getAllRooms(socket: Socket, user: IUser) {
  const rooms = await UserRoom.getUserRooms(user.id);
  socket.join(rooms.map((room: any) => room.id));
  socket.emit(events.roomFetchAll, rooms);
}

export type TGetMessagesReq = {roomId: number, offset?: number, limit?: number};
export async function getMessages(socket: Socket, user: IUser, req: TGetMessagesReq) {
  const messages = await Room.getMessages(req.roomId, user.id, {offset: req.offset, limit: req.limit});
  socket.emit(events.roomFetchMessages, messages);
}

export type TNewMessagesReq = TMessage[];
export async function newMessages(socket: Socket, user: IUser, req: TNewMessagesReq) {
  const messages = await Promise.all(req.map(message => {
    return Message.create(message);
  }));

  socket.emit(events.roomFetchNewMessages, messages);
}
