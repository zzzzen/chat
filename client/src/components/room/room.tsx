import React from "react";
import "./room.scss";

export const Room = React.memo((p: TRoomProps) => {

  return <div className={`${p.className || ""} room`}>
    <div className="room__image"></div>
    <div className="room__info">
      <div className="room__row">
        <div className="room__col">
          <div className="room__title">{p.room.name}</div>
        </div>
      </div>
    </div>
  </div>;
});

type TRoomProps = {
  className?: string,
  room: any
}
