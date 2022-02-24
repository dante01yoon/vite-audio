import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./utils";
import { translateRouter as translate, ttsRouter as tts } from "./routes";
import "./utils/fetch-polyfills";

dotenv.config({
  path: "./.env",
});
const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/translate", translate);
app.use("/tts", tts);
connectDB().then(() => {
  console.log("db is connected");
});
app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`);
});
