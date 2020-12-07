/// <reference types="react-scripts" />
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";

declare module "simplebar-react" {
  import {FC} from "react";
  const SimpleBar: FC;
  export default SimpleBar;
}
