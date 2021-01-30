import {Router} from "express";
import {authenticate} from "passport";
import {createRoom} from "../controllers/room";

export const roomRouter = Router();

roomRouter.post("", authenticate("jwt", {session: false}), createRoom);

