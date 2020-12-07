import produce from "immer";
import {TUserActions, USER_LOGIN, USER_LOGOUT} from "../actions/user";
import {TUserInfo} from "../types/common";

export const userReducer = produce((draft: TUserStore, action: TUserActions) => {
  switch (action.type) {
  case USER_LOGIN: {
    draft.info = action.payload;
    draft.isLogin = true;
  } break;
  case USER_LOGOUT: {
    draft.info = null;
    draft.isLogin = false;
  }
  }
}, {
  info: null,
  isLogin: false
});

export type TUserStore = {
  info: null | TUserInfo,
  isLogin: boolean
}
