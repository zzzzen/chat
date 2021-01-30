import {DataTypes, Model} from "sequelize";
import {db} from "../db";
import {Room, ROOM_NOT_FOUND} from "./Room";

export class UserRoom {
  static async getUserRooms(userId: number) {
    const rooms = await UserRoom.model.findAll({
      where: {userId}
    });
    const results = await Promise.all(rooms.map(room => {
      const id = room.getDataValue("roomId");
      return Room.getData(id);
    }));
    return results.filter(results => results !== ROOM_NOT_FOUND);
  }

  static model = db.define<Model<TUserRoom, TUserRoom>>("users_rooms", {
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false
  });

  static extend<T>(RoomInstance: T): T & typeof UserRoom.instanceMethods {
    return Object.assign(RoomInstance, UserRoom.instanceMethods);
  }

  private static instanceMethods = {
    getData: async function(this: Model<TUserRoom, TUserRoom>) {
    }
  };
}

export type TUserRoom = {
  roomId: number,
  userId: number,
}


