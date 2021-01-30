import {Router} from "express";
import {authenticate} from "passport";
import {createMessage, getMessages} from "../controllers/message";

export const messageRouter = Router();

messageRouter.post("", authenticate("jwt", {session: false}), createMessage);
messageRouter.get("", authenticate("jwt", {session: false}), getMessages);

