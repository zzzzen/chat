import React from "react";
import "./header.scss";
import {CustomButton} from "../ui/custom-button/custom-button";

export function Header(p: THeaderProps) {
  console.log(p);
  return <header className={`${p.className || ""} header`}>
    <CustomButton onClick={() => {
      // @ts-ignore
      p.sendMessage("first message");
    }}>
      Send
    </CustomButton>
  </header>;
}

type THeaderProps = {
  className?: string
}
