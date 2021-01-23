import React from "react";
import "./header.scss";

export function Header(props: THeaderProps) {
  return <header className={`${props.className || ""} header`}>
  </header>;
}

type THeaderProps = {
  className?: string
}
