import React from "react";
import "./main-page.scss";
import {Chat} from "../../components/chat/chat";
import {RoomsSearchContainer} from "../../components/rooms-search/rooms-search";
import {WebsocketContext} from "../../providers/websocket-provider";

export const MainPage = React.memo(() => {
  return <div className="main-page">
    <div className="main-page__aside">
      <WebsocketContext.Consumer>
        {(props) => <RoomsSearchContainer className="main-page__rooms" {...props}/>}
      </WebsocketContext.Consumer>
    </div>

    <div className="main-page__main">
      <Chat className="main-page__chat"/>
    </div>
  </div>;
});
