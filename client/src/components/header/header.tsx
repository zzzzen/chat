import React from "react";
import "./header.scss";
import {TWebsocketProps} from "../../providers/websocket-provider";

export function Header(p: THeaderProps & TWebsocketProps) {

  return <header className={`${p.className || ""} header`}>
    <div className="header__aside">

    </div>
    <div className="header__main">

    </div>
  </header>;
}

type THeaderProps = {
  className?: string
}
