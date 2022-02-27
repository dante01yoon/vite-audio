import { Router } from "express";
import { authChecker, authSign } from "../middleware";
import { login, register, me } from "../controllers";

export const userRouter = Router();

userRouter.post("/me", authChecker, me);

userRouter.post("/signUp", register, authSign);

userRouter.post("/signIn", login, authSign);
