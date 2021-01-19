import produce from "immer";
import {TUserAction, USER_GET_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../actions/user";
import {TUserInfo} from "../types/common";
import {setToken} from "../utils/api";

export const userReducer = produce((draft: TUserStore, action: TUserAction) => {
  switch (action.type) {

  case USER_LOGIN_SUCCESS: {
    console.log(action.payload.data);
    setToken(action.payload.data.token);
    delete action.payload.data.token;
    draft.info = action.payload.data;
  } break;

  case USER_LOGOUT: {
    draft.info = null;
    setToken("");
    window.location.reload();
  } break;

  case USER_GET_SUCCESS: {
    draft.info = action.payload.data;
  } break;

  }
}, {
  info: null
});

export type TUserStore = {
  info: null | TUserInfo
}
