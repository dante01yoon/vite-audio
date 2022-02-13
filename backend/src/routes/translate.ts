import express from "express";
import { getTranslate } from "../controllers";

export const translateRouter = express.Router();

translateRouter.get("/", getTranslate);
