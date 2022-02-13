import express from "express";
import bodyParser from "body-parser";
import { translateRouter as translate } from "./routes";

const PORT = 4000;
const app = express();

app.use(bodyParser.json());

app.use("/translate", translate);

app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`);
});
