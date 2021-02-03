import React, {createContext, useRef} from "react";
import {io} from "socket.io-client";
import {useSelector} from "react-redux";
import {TStore} from "../store";
import {TUserInfo} from "../types/common";
import {getToken} from "../utils/api";

export const WebsocketContext = createContext<TWebsocketProps>(null as unknown as TWebsocketProps);

export const WebsocketProvider = (p: {children: React.ReactNode}) => {
  const user = useSelector((store: TStore) => store.user.info as TUserInfo);
  const socketRef = useRef(io(process.env.REACT_APP_API as string, {
    query: {
      userId: user.id
    },
    extraHeaders: {
      "Authorization": getToken()
    }
  }).connect());

  const sendMessage = (message: string) => {
    socketRef.current.emit("message:create", {
      message,
      userId: user.id
    });
  };

  return <WebsocketContext.Provider value={{
    socket: socketRef.current,
    sendMessage
  }}>
    {p.children}
  </WebsocketContext.Provider>;
};

export type TWebsocketProps = {

}
