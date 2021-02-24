import React from "react";
import "./rooms.scss";
import {Room} from "../room/room";

export const Rooms = React.memo((p: TRoomsProps) => {

  return <div className={`${p.className || ""} rooms`}>
    {(p.rooms || []).map(room => <Room className="rooms__item" room={room} key={room.id}/>)}
  </div>;
});

type TRoomsProps = {
  className?: string,
  rooms?: any[]
}
