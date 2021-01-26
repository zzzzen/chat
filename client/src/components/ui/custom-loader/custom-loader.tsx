import React from "react";
import "./custom-loader.scss";
import {connect} from "react-redux";
import {TStore} from "../../../store";

export const CustomLoader = React.memo((p: TCustomLoaderProps) => {
  return p.visible ? <div className="custom-loader"/> : null;
});

export const CustomLoaderContainer = connect((store: TStore) => ({visible: store.common.isLoaderVisible}))(CustomLoader);

type TCustomLoaderProps = {
  visible: boolean
}
