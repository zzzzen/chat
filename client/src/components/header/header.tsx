import React from "react";
import "./header.scss";
import {CustomButton} from "../ui/custom-button/custom-button";
import {TWebsocketProps} from "../../providers/websocket-provider";

export function Header(p: THeaderProps & TWebsocketProps) {

  return <header className={`${p.className || ""} header`}>
    <CustomButton onClick={() => {
      p.createRoom({
        usersIds: [123454, 1],
        name: "Вторая комната"
      });
    }}>
      Send
    </CustomButton>
  </header>;
}

type THeaderProps = {
  className?: string
}
