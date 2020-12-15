import Express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";

import {passportMiddleware} from "./middlewares/passport";
import {authRouter} from "./routes/auth";
import {db} from "./db";

export const app = Express();

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

app.use("/api/auth", authRouter);
