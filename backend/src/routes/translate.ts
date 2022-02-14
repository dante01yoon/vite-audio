import express from "express";
import { postTranslate } from "../controllers";

export const translateRouter = express.Router();

translateRouter.post("/", postTranslate);
