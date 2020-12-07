import React from "react";
import {Route} from "react-router-dom";
import {Footer} from "../components/common/footer/footer";
import {MainPage} from "../pages/main-page/main-page";
import {HeaderContainer} from "../components/common/header/header-container";

export function MainLayout() {
  return (
    <>
      <HeaderContainer/>
      <Route path="/" exact component={MainPage}/>
      <Footer/>
    </>
  );
}
