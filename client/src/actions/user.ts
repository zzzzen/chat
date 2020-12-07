import {TUserInfo} from "../types/common";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export function ALoginUser(): TLoginUser {
  return {
    type: USER_LOGIN,
    payload: {name: "asd", email: "asd@mail.ru"}
  };
}

export function ALogoutUser(): TLogoutUser {
  return {
    type: USER_LOGOUT
  };
}

type TLoginUser = {
  type: typeof USER_LOGIN,
  payload: TUserInfo
}

type TLogoutUser = {
  type: typeof USER_LOGOUT
}

export type TUserActions = TLoginUser | TLogoutUser
