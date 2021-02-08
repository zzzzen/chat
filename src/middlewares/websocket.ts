import {Server} from "socket.io";
import {TServer} from "../app";
import {passportWebsocketMiddleware} from "./passport";
import {
  createRoom,
  getAllRooms,
  getMessages,
  getRoom, newMessages,
  TCreateRoomReq,
  TGetMessagesReq,
  TGetRoomReq, TNewMessagesReq
} from "../controllers/room";

export const events = {
  roomCreate: "room/create",
  roomGet: "room/get",
  roomFetch: "room/fetch",

  roomGetAll: "room/getAll",
  roomFetchAll: "room/fetchAll",

  roomGetMessages: "room/getMessages",
  roomFetchMessages: "room/fetchMessages",
  roomNewMessages: "room/newMessages",
  roomFetchNewMessages: "room/fetchNewMessages"
};

export const websocketMiddleware = (server: TServer) => {
  const websocket = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    }
  });

  websocket.use(passportWebsocketMiddleware());

  websocket.on("connection", async (socket) => {
    socket.on(events.roomCreate, (data: TCreateRoomReq) => createRoom(data, socket));
    socket.on(events.roomGet, (data: TGetRoomReq) => getRoom(data, socket));

    socket.on(events.roomGetAll, () => getAllRooms(socket));

    socket.on(events.roomGetMessages, (data: TGetMessagesReq) => getMessages(data, socket));
    socket.on(events.roomNewMessages, (data: TNewMessagesReq) => newMessages(data, socket));

    await getAllRooms(socket);
  });
};
