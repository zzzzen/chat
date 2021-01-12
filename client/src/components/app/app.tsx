import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../store";
import {LoginContainer} from "../login/login";

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={LoginContainer}/>
      </BrowserRouter>
    </Provider>
  );
}
