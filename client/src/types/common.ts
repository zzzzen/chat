import {AxiosRequestConfig, AxiosResponse} from "axios";

export type TAction = {type: string, payload?: any}
export type TDispatch = (action: TAction) => void;
export type TAsyncDispatch = <T> (action: TAction) => Promise<T>;

export type TUserInfo = {
  id: number,
  name: string,
  surname: string,
  patronymic?: string,
  phone: string,
  avatar?: string,
  email?: string
}

export type TResponseAction = {
  error: {
    config: AxiosRequestConfig,
    isAxiosError: boolean,
    request: unknown,
    response: AxiosResponse,
    toJSON: () => string,
  },
  meta: {
    previousAction: TAction
  }
}
