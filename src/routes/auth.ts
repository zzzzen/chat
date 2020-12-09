import {Router} from "express";
import {login, register} from "../controllers/auth";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
