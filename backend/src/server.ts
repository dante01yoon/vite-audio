import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { translateRouter as translate } from "./routes";

dotenv.config({
  path: "./.env",
});
const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/translate", translate);

app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`);
});
