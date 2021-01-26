export const COMMON_SET_LOADER_STATE = "COMMON_SET_LOADER_STATE";

export type TCommonAction =
  {
    type: typeof COMMON_SET_LOADER_STATE,
    payload: boolean
  };

export const ASetLoaderState = (visible: boolean): TCommonAction => ({
  type: COMMON_SET_LOADER_STATE,
  payload: visible
});
