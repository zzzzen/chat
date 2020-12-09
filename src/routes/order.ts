import Express from "express";
import {authenticate} from "passport";
import {create, getAll} from "../controllers/order";

export const orderRouter = Express.Router();

orderRouter.get("/",  authenticate("jwt", {session: false}), getAll);
orderRouter.post("/",  authenticate("jwt", {session: false}), create);

