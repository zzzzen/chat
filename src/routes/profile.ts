import {Router} from "express";
import {edit, getProfile, getRooms, login, register} from "../controllers/user";
import {authenticate} from "passport";

export const profileRouter = Router();

profileRouter.post("/authorization", login);
profileRouter.post("/register", register);
profileRouter.get("/rooms", authenticate("jwt", {session: false}), getRooms);
profileRouter.put("", authenticate("jwt", {session: false}), edit);
profileRouter.get("", authenticate("jwt", {session: false}), getProfile);
