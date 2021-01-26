import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import axiosMiddleware from "redux-axios-middleware";
import {api} from "./utils/api";
import {userReducer, TUserStore} from "./reducers/user";
import {commonReducer, TCommonStore} from "./reducers/common";

export const store = createStore(
  combineReducers({
    user: userReducer,
    common: commonReducer
  }),
  composeWithDevTools(
    applyMiddleware(
      axiosMiddleware(api)
    ),
  ));

export type TStore = typeof store & {
  user: TUserStore,
  common: TCommonStore
}
