import {DataTypes, Model, Op, Optional} from "sequelize";
import {db} from "../db";
import {Message} from "./Message";
import {UserRoom} from "./UserRoom";

export const ROOM_NOT_FOUND = 400;
export const ROOM_SUCCESS = 200;

export class Room {
  static async create(data: TRoomCreate, usersIds: number[]) {
    const newRoom = Room.extend(await Room.model.create(data));
    const newRoomData = await newRoom.getData();
    if (data.id) delete data.id;
    usersIds.map(id => UserRoom.model.create({
      userId: id,
      roomId: newRoomData.id
    }));

    return newRoom;
  }

  static async delete(id: number) {
    const room = await Room.model.findByPk(id);
    if (!room) return ROOM_NOT_FOUND;
    await room.destroy();
    return ROOM_SUCCESS;
  }

  static async getData(id: number) {
    const room = await this.model.findByPk(id);
    if (!room) return ROOM_NOT_FOUND;

    const data = room.get({plain: true});
    const messages = await Message.model.findAll({
      limit: 1,
      where: {roomId: data.id},
      order: [["createdAt", "DESC"]]
    });
    return {...data, lastMessage: messages[0]};
  }

  static async getNewMessages(roomId: number, userId: number) {
    const newMessages = await Message.model.findAll({
      where: {
        roomId,
        viewersIds: {
          [Op.notLike]: `|${userId}|`
        },
      }
    });
    await Promise.all(newMessages.map(newMessage => {
      const data = newMessage.get({plain: true});
      return Message.getByUser(data.id, userId);
    }));
    return newMessages;
  }

  static async getMessages(roomId: number, userId: number, {offset = 0, limit = 50} = {}) {
    const messages = await Message.model.findAll({
      where: {roomId},
      offset,
      limit
    });
    await Promise.all(messages.map(message => {
      const data = message.get({plain: true});
      return Message.getByUser(data.id, userId);
    }));
    return messages;
  }

  static model = db.define<Model<TRoom, TRoomCreate>>("rooms", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    }
  }, {
    timestamps: false
  });

  static extend<T>(RoomInstance: T): T & typeof Room.instanceMethods {
    return Object.assign(RoomInstance, Room.instanceMethods);
  }

  private static instanceMethods = {
    getData: async function(this: Model<TRoom, TRoomCreate>) {
      const data = this.get({plain: true});
      const messages = await Message.model.findAll({
        limit: 1,
        where: {roomId: data.id},
        order: [["createdAt", "DESC"]]
      });
      return {...data, lastMessage: messages[0]};
    }
  };
}

export type TRoom = {
  id: number,
  name: string,
}

type TRoomCreate = Optional<TRoom, "id">

