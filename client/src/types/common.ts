import {AxiosRequestConfig, AxiosResponse} from "axios";

export type TAction <T = any> = {type: string, payload?: T}
export type TDispatch = (action: TAction) => unknown;
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

export type TMessage = {
  id: number,
  userId: number,
  roomId: number,
  text?: string,
  file?: string,
  createdAt: string,
  updatedAt: string,
  viewersIds?: string
}

export type TRoom = {
  id?: number,
  name: string,
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
