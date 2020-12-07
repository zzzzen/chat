import {connect, ConnectedProps} from "react-redux";
import {TStore} from "../../../store";
import {TDispatch} from "../../../types/common";
import {ALoginUser, ALogoutUser} from "../../../actions/user";
import {Header} from "./header";

const mapStateToProps = (store: TStore) => {
  return {
    userInfo: store.user
  };
};

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    login: () => dispatch(ALoginUser()),
    logout: () => dispatch(ALogoutUser())
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export const HeaderContainer = connector(Header);

export type THeaderContainer = ConnectedProps<typeof connector>

