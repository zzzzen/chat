import http from "http";
import Express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";

import {db} from "./db";
import {passportAppMiddleware} from "./middlewares/passport";
import {profileRouter} from "./routes/profile";
import {websocketMiddleware} from "./middlewares/websocket";

const app = Express();

db.authenticate()
  .then(() => console.log("DB connected"))
  .catch(() => console.error("DB not connected"));

const passportHandler = passport.initialize();
passportAppMiddleware(passport);
app.use(passportHandler);


app.use(morgan("dev"));
app.use("/uploads", Express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/profile", profileRouter);

export const server = http.createServer(app);
export type TServer = typeof server;

websocketMiddleware(server);

