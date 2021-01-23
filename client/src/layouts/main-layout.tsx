import React from "react";
import {Route} from "react-router-dom";
import {MainPage} from "../pages/main-page/main-page";
import {Header} from "../components/header/header";

export function MainLayout() {
  return (
    <>
      <Header/>
      <Route path="/" exact component={MainPage}/>
    </>
  );
}
