import {Router} from "express";
import {edit, getProfile, login, register} from "../controllers/auth";
import {authenticate} from "passport";

export const profileRouter = Router();

profileRouter.post("/authorization", login);
profileRouter.post("/register", register);
profileRouter.put("", authenticate("jwt", {session: false}), edit);
profileRouter.get("", authenticate("jwt", {session: false}), getProfile);
