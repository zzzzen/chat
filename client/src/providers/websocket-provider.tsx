import React, {createContext, useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {useSelector} from "react-redux";
import {TStore} from "../store";
import {TMessage, TRoom, TUserInfo} from "../types/common";
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

export const WebsocketProvider = (p: {children: React.ReactNode}) => {
  const user = useSelector((store: TStore) => store.user.info as TUserInfo);
  const socketRef = useRef(io(process.env.REACT_APP_API as string, {
    extraHeaders: {
      "Authorization": getToken()
    }
  }).connect());
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    socketRef.current.on(events.roomFetchAll, setRooms);
    socketRef.current.on(events.roomFetch, (resp) => {
      console.log(resp);
    });
  }, []);

  const sendMessage = (message: TMessage[]) => {
    return socketRef.current.emit(events.roomNewMessages, message);
  };

  const createRoom = (data: TCreateRoomReq) => {
    return socketRef.current.emit(events.roomCreate, data);
  };

  return <WebsocketContext.Provider value={{
    socket: socketRef.current,
    rooms,
    sendMessage,
    createRoom
  }}>
    {p.children}
  </WebsocketContext.Provider>;
};

export type TWebsocketProps = {
  socket: Socket,
  sendMessage: (message: TMessage[]) => Socket,
  createRoom: (data: TCreateRoomReq) => Socket,
  rooms: null | TRoom[]
}

export type TCreateRoomReq = TRoom & {usersIds: number[]}
