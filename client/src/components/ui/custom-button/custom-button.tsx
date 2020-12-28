import React from "react";
import {Button} from "antd";
import {ButtonProps} from "antd/lib/button";

export function CustomButton(p: TCustomButtonProps) {
  return <Button {...p} className={`${p.className || ""} custom-button`}/>;
}

type TCustomButtonProps = ButtonProps;
