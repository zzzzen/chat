import React from "react";
import "./main-layout.scss";
import {Route} from "react-router-dom";
import {MainPage} from "../../pages/main-page/main-page";
import {Header} from "../../components/header/header";
import {WebsocketContext, WebsocketProvider} from "../../providers/websocket-provider";

export function MainLayout() {
  return (
    <div className="main-layout">
      <div className="main-layout__container">
        <WebsocketProvider>
          <WebsocketContext.Consumer>
            {props => <Header {...props}/>}
          </WebsocketContext.Consumer>
          <Route path="/" exact component={MainPage}/>
        </WebsocketProvider>
      </div>
    </div>
  );
}
