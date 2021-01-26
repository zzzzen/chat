import produce from "immer";
import {COMMON_SET_LOADER_STATE, TCommonAction} from "../actions/common";

export const commonReducer = produce((draft: TCommonStore, action: TCommonAction) => {
  switch (action.type) {

  case COMMON_SET_LOADER_STATE: {
    draft.isLoaderVisible = action.payload;
  } break;

  }
}, {
  isLoaderVisible: false
});

export type TCommonStore = {
  isLoaderVisible: boolean
}
