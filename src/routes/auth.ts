import {Request, Router} from "express";
import {login, register} from "../controllers/auth";
import {IUser} from "../models/User";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
