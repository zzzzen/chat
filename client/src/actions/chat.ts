export const COMMON_GET_ALL_ROOMS = "COMMON_GET_ALL_ROOMS";

export type TChatAction =
  {
    type: typeof COMMON_GET_ALL_ROOMS,
    payload: any[]
  };

export const AGetAllRooms = (rooms: any[]): TChatAction => ({
  type: COMMON_GET_ALL_ROOMS,
  payload: rooms
});
