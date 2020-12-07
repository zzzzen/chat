export type TAction = {type: string, payload?: any}
export type TDispatch = (action: TAction) => void

export type TUserInfo = {name: string, email: string}
