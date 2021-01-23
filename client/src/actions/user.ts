import {TUserInfo} from "../types/common";
import {AxiosRequestConfig, AxiosResponse} from "axios";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_REGISTER = "USER_REGISTER";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_GET = "USER_GET";
export const USER_GET_SUCCESS = "USER_GET_SUCCESS";

export type TUserAction =
  {
    type: typeof USER_LOGIN,
    payload: {
      request: AxiosRequestConfig
    }
  } | {
    type: typeof USER_LOGIN_SUCCESS,
    payload: AxiosResponse<TUserInfo & {token: string}>
  } | {
    type: typeof USER_LOGOUT
  } | {
    type: typeof USER_GET,
    payload: {
      request: AxiosRequestConfig
    }
  } | {
    type: typeof USER_GET_SUCCESS,
    payload: AxiosResponse<Omit<TUserInfo, "password">>
  } | {
    type: typeof USER_REGISTER,
    payload: {
      request: AxiosRequestConfig
    }
  } | {
    type: typeof USER_REGISTER_SUCCESS,
    payload: AxiosResponse<TUserInfo & {token: string}>
  };

export type TLoginUserData = {phone: string, password: string};
export const ALoginUser = (data: TLoginUserData): TUserAction => ({
  type: USER_LOGIN,
  payload: {
    request: {
      method: "POST",
      url: "/profile/authorization",
      data
    }
  }
});

export type TRegisterUserData = Omit<TUserInfo, "id" | "avatar">;
export const ARegisterUser = (data: TRegisterUserData): TUserAction => ({
  type: USER_REGISTER,
  payload: {
    request: {
      method: "POST",
      url: "/profile/register",
      data
    }
  }
});

export const AGetUser = (): TUserAction => ({
  type: USER_GET,
  payload: {
    request: {
      url: "/profile",
    }
  }
});

export const ALogoutUser = (): TUserAction => ({
  type: USER_LOGOUT
});
