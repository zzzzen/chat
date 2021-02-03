import React from "react";
import {Route} from "react-router-dom";
import {MainPage} from "../pages/main-page/main-page";
import {Header} from "../components/header/header";
import {WebsocketContext, WebsocketProvider} from "../providers/websocket-provider";

export function MainLayout() {
  return (
    <WebsocketProvider>
      <WebsocketContext.Consumer>
        {props => <Header {...props}/>}
      </WebsocketContext.Consumer>
      <Route path="/" exact component={MainPage}/>
    </WebsocketProvider>
  );
}
