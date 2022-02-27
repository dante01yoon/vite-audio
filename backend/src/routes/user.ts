import { Router } from "express";
import { authSign } from "../middleware";
import { login, register } from "../controllers";

export const userRouter = Router();

userRouter.post("/signUp", register, authSign);

userRouter.post("/signIn", login, authSign);
