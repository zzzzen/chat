export type TAction = {type: string, payload?: any}
export type TDispatch = (action: TAction) => void

export type TUserInfo = {
  id: number,
  name: string,
  surname: string,
  patronymic?: string,
  phone: string,
  avatar?: string,
  email?: string
}
