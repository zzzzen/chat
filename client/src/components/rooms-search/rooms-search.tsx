import React from "react";
import "./rooms-search.scss";
import {TRoomsContainerProps, withRooms} from "../../hoc/chat/with-rooms";
import {Rooms} from "../rooms/rooms";

export const RoomsSearch = React.memo((p: TRoomsSearchProps & TRoomsContainerProps) => {
  console.log(p.rooms);
  return <div className={`${p.className || ""} rooms-search`}>
    {p.rooms ?
      <Rooms className="rooms-search__rooms"
        rooms={p.rooms}/> : null}
  </div>;
});

export const RoomsSearchContainer = withRooms(RoomsSearch);

type TRoomsSearchProps = {
  className?: string
}
