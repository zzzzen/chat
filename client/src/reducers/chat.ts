import produce from "immer";
import {COMMON_GET_ALL_ROOMS, TChatAction} from "../actions/chat";

export const chatReducer = produce((draft: TChatStore, action: TChatAction) => {
  switch (action.type) {

  case COMMON_GET_ALL_ROOMS: {
    draft.rooms = action.payload;
  } break;

  }
}, {
  rooms: null
});

export type TChatStore = {
  rooms: any[] | null
}
