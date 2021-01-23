import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../store";
import {AuthorizationContainer} from "../authorization/authorization";

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={AuthorizationContainer}/>
      </BrowserRouter>
    </Provider>
  );
}
