import { Router } from "express";
import { createCard } from "../controllers";

export const cardRouter = Router();

cardRouter.post("/create", createCard);
