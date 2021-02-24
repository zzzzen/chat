import React from "react";
import "./chat.scss";

export const Chat = React.memo((p: TChatProps) => {

  return <div className={`${p.className || ""} chat`}>

  </div>;
});

type TChatProps = {
  className?: string
}
