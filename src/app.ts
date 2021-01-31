import http from "http";
import Express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";

import {db} from "./db";
import {passportMiddleware} from "./middlewares/passport";
import {profileRouter} from "./routes/profile";
import {roomRouter} from "./routes/room";
import {messageRouter} from "./routes/message";

const app = Express();

db.authenticate()
  .then(() => console.log("DB connected"))
  .catch(() => console.error("DB not connected"));

app.use(passport.initialize());
passportMiddleware(passport);


app.use(morgan("dev"));
app.use("/uploads", Express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/profile", profileRouter);
app.use("/api/room", roomRouter);
app.use("/api/message", messageRouter);

export const server = http.createServer(app);
const websocket = require("socket.io")(server);

websocket.on("connection", () => {
  console.log("websocket connected");
});
