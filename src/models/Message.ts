import {DataTypes, Model, Op, Optional} from "sequelize";
import {db} from "../db";

const MESSAGE_NOT_FOUND = 400;
const MESSAGE_SUCCESS = 200;

export type TGetForPeriod = {
  roomId: number,
  userId: number,
  dateStart: string,
  dateEnd: string
}

export class Message {
  static async create(data: TMessageCreate) {
    if (data.id) delete data.id;
    return Message.extend(await Message.model.create(data));
  }

  static async delete(id: number) {
    const message = await Message.model.findByPk(id);
    if (!message) return MESSAGE_NOT_FOUND;
    await message.destroy();
    return MESSAGE_SUCCESS;
  }

  static async getForPeriod({dateEnd, dateStart, roomId, userId}: TGetForPeriod) {
    const messages = await Message.model.findAll({
      where: {
        roomId,
        createdAt: {
          [Op.between]: [dateStart, dateEnd]
        }
      }
    });

    return await Promise.all(messages.map(message => {
      const data = Message.extend(message).getData();
      return Message.getByUser(data.id, userId);
    }));
  }

  static async getByUser(messageId: number, userId: number) {
    const message = await Message.model.findByPk(messageId);
    if (!message) return MESSAGE_NOT_FOUND;

    const viewersIds = (message.getDataValue("viewersIds") || "").split(",");
    if (!viewersIds.includes(userId.toString())) {
      viewersIds.push(userId.toString());
      await message.update({viewersIds: viewersIds.join(",")});
    }
    return message.get({plain: true});
  }

  static model = db.define<Model<TMessage, TMessageCreate>>("messages", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER
    },
    roomId: {
      type: DataTypes.INTEGER
    },
    text: {
      type: DataTypes.TEXT
    },
    file: {
      type: DataTypes.STRING(200)
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    viewersIds: {
      type: DataTypes.STRING(1000)
    }
  });

  static extend<T>(MessageInstance: T): T & typeof Message.instanceMethods {
    return Object.assign(MessageInstance, Message.instanceMethods);
  }

  private static instanceMethods = {
    getData: function(this: Model<TMessage, TMessageCreate>) {
      return this.get({plain: true});
    }
  };
}

export type TMessage = {
  id: number,
  userId: number,
  roomId: number,
  text?: string,
  file?: string,
  createdAt: string,
  updatedAt: string,
  viewersIds?: string
}

type TMessageCreate = Optional<TMessage, "id">
