import React from "react";
import {Route} from "react-router-dom";
import {MainPage} from "../pages/main-page/main-page";
import {HeaderContainer} from "../components/header/header-container";

export function MainLayout() {
  return (
    <>
      <HeaderContainer/>
      <Route path="/" exact component={MainPage}/>
    </>
  );
}
