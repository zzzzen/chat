import {Sequelize} from "sequelize";

export const db = new Sequelize({
  database: "chat",
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "123456"
});
