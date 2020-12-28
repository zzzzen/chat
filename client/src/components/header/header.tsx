import React from "react";
import "./header.scss";
import {THeaderContainer} from "./header-container";

export function Header(props: THeaderProps) {
  return <header className={`${props.className || ""} header`}>
    <div className="header__logo" onClick={props.userInfo.isLogin ? props.logout : props.login}/>
    <div className="header__user">{JSON.stringify(props.userInfo)}</div>
  </header>;
}

type THeaderProps = {
  className?: string
} & THeaderContainer
