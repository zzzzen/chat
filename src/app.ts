import http from "http";
import Express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";

import {db} from "./db";
import {passportMiddleware} from "./middlewares/passport";
import {profileRouter} from "./routes/profile";
import {Server} from "socket.io";
import {createRoom} from "./controllers/room";
import {createMessage} from "./controllers/message";

const app = Express();

db.authenticate()
  .then(() => console.log("DB connected"))
  .catch(() => console.error("DB not connected"));

const passportHandler = passport.initialize();
passportMiddleware(passport);
app.use(passportHandler);


app.use(morgan("dev"));
app.use("/uploads", Express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/profile", profileRouter);

export const server = http.createServer(app);
const websocket = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

websocket.use((socket: any, next: any) => {
  return passportHandler(socket.request, {} as any, next);
});


websocket.use((socket, next) => {
  // @ts-ignore
  console.log(socket.request.user);

  // @ts-ignore
  if (socket.request.user) {
    return next();
  } else {
    return next(new Error("unauthorized"));
  }
});


websocket.on("connection", (socket) => {
  socket.on("room:create", createRoom);
  socket.on("message:create", createMessage);
});

