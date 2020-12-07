import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {TUserStore, userReducer} from "./reducers/user";

export const store = createStore(combineReducers({
  user: userReducer
}), composeWithDevTools(applyMiddleware(thunk)));

export type TStore = {
  user: TUserStore
}
