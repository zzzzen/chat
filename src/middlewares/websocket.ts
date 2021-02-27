import {Server} from "socket.io";
import {TServer} from "../app";
import {
  createRoom,
  getAllRooms,
  getMessages,
  getRoom, newMessages,
  TCreateRoomReq,
  TGetMessagesReq,
  TGetRoomReq, TNewMessagesReq
} from "../controllers/room";
import {authorize} from "./passport";

export const events = {
  roomCreate: "room/create",
  roomGet: "room/get",
  roomFetch: "room/fetch",

  roomGetAll: "room/getAll",
  roomFetchAll: "room/fetchAll",

  roomGetMessages: "room/getMessages",
  roomFetchMessages: "room/fetchMessages",
  roomNewMessages: "room/newMessages",
  roomFetchNewMessages: "room/fetchNewMessages",

  unauthorized: "unauthorized"
};

export const websocketMiddleware = (server: TServer) => {
  const websocket = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    }
  });

  websocket.on("connection", async (socket) => {
    socket.on(events.roomCreate, authorize(socket, createRoom));
    socket.on(events.roomGet, authorize(socket, getRoom));

    socket.on(events.roomGetAll, authorize(socket, getAllRooms));

    socket.on(events.roomGetMessages, authorize(socket, getMessages));
    socket.on(events.roomNewMessages, authorize(socket, newMessages));

    // await getAllRooms(socket);
  });
};
