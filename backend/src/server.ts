import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB, logging } from "./utils";
import {
  translateRouter as translate,
  ttsRouter as tts,
  userRouter as user,
} from "./routes";
import "./utils/fetch-polyfills";
import { authChecker } from "./middleware";

dotenv.config({
  path: "./.env",
});
const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", user);
app.use("/translate", authChecker, translate);
app.use("/tts", authChecker, tts);
connectDB(() => logging.write("db is connected"));
app.listen(PORT, () => {
 logging.write(`app is running on PORT ${PORT}`);
});
