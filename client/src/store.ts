import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {TUserStore, userReducer} from "./reducers/user";
import axiosMiddleware from "redux-axios-middleware";
import {api} from "./utils/api";

export const store = createStore(
  combineReducers({
    user: userReducer
  }),
  composeWithDevTools(
    applyMiddleware(
      axiosMiddleware(api)
    ),
  ));

export type TStore = {
  user: TUserStore
}
