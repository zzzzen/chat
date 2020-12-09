import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";

import keys from "./config/keys";
import {passportMiddleware} from "./middlewares/passport";
import {orderRouter} from "./routes/order";
import {authRouter} from "./routes/auth";
import {positionRouter} from "./routes/position";
import {categoryRouter} from "./routes/category";

export const app = Express();

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.use(passport.initialize());
passportMiddleware(passport);


app.use(morgan("dev"));
app.use("/uploads", Express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/order", orderRouter);
app.use("/api/position", positionRouter);
