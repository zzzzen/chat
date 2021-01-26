import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../store";
import {AuthorizationContainer} from "../authorization/authorization";
import {CustomLoaderContainer} from "../ui/custom-loader/custom-loader";

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CustomLoaderContainer/>
        <Route path="/" component={AuthorizationContainer}/>
      </BrowserRouter>
    </Provider>
  );
}
