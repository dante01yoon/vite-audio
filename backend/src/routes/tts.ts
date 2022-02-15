import express from "express";
import { postTTS } from "../controllers";

export const ttsRouter = express.Router();

ttsRouter.post("/", postTTS);
