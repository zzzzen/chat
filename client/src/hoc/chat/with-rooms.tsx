import React, {useEffect} from "react";
import {connect, ConnectedProps} from "react-redux";
import {TDispatch} from "../../types/common";
import {events, TWebsocketProps} from "../../providers/websocket-provider";
import {AGetAllRooms} from "../../actions/chat";
import {TStore} from "../../store";

const mapStateToProps = (store: TStore) => {
  return {
    rooms: store.chat.rooms
  };
};

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    getAllRooms: (rooms: any[]) => dispatch(AGetAllRooms(rooms))
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export function withRooms<T>(Component: React.ComponentType<T & TRoomsContainerProps>) {

  const RoomsContainer = React.memo((p: TRoomsContainerProps) => {

    useEffect(() => {
      p.socket.on(events.roomFetchAll, p.getAllRooms);
    }, []);

    const componentProps = {
      ...p,
    } as T & TRoomsContainerProps;

    return <Component {...componentProps}/>;
  });

  return connector(RoomsContainer) as unknown as React.ComponentType<T>;
}

export type TRoomsContainerProps = ConnectedProps<typeof connector> & TWebsocketProps & {
};

