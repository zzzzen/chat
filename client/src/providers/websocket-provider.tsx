import React, {createContext, useRef} from "react";
import {io, Socket} from "socket.io-client";
import {TMessage, TRoom} from "../types/common";
import {getToken} from "../utils/api";

export const WebsocketContext = createContext<TWebsocketProps>(null as unknown as TWebsocketProps);

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

export const WebsocketProvider = React.memo((p: {children: React.ReactNode}) => {
  const socketRef = useRef(io(process.env.REACT_APP_API as string, {
    extraHeaders: {
      "Authorization": getToken()
    }
  }).connect());

  const sendMessage = (message: TMessage[]) => {
    return socketRef.current.emit(events.roomNewMessages, message);
  };

  const createRoom = (data: TCreateRoomReq) => {
    return socketRef.current.emit(events.roomCreate, data);
  };

  return <WebsocketContext.Provider value={{
    socket: socketRef.current,
    sendMessage,
    createRoom
  }}>
    {p.children}
  </WebsocketContext.Provider>;
});

export type TWebsocketProps = {
  socket: Socket,
  sendMessage: (message: TMessage[]) => Socket,
  createRoom: (data: TCreateRoomReq) => Socket,
}

export type TCreateRoomReq = TRoom & {usersIds: number[]}
