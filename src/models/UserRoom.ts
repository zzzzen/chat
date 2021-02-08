import {DataTypes, Model, Optional} from "sequelize";
import {db} from "../db";
import {Room, ROOM_NOT_FOUND} from "./Room";
import {IUser} from "./User";

export class UserRoom {
  static async getUserRooms(userId: number) {
    const rooms = await UserRoom.model.findAll({
      where: {userId}
    });
    const results = await Promise.all(rooms.map(room => {
      const id = room.getDataValue("roomId");
      return Room.getData(id);
    }));
    return results.filter(result => result !== ROOM_NOT_FOUND);
  }

  static model = db.define<Model<TUserRoom, TUserRoomCreate>>("users_rooms", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  id: number,
  roomId: number,
  userId: number,
}

type TUserRoomCreate = Optional<TUserRoom, "id">


