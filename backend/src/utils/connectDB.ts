import mongoose from "mongoose";
import { logging } from ".";

export const connectDB = async (
  successCB?: () => void,
  failCB?: () => void
) => {
  const db = mongoose.connection;
  db.on("connecting", () => {
    logging.write("connecting mongoose...");
  });
  db.on("connected", () => {
    if (successCB) {
      successCB();
    }
  });
  db.on("error", () => {
    console.error.bind(console, "MongoDB connection error");
    if (failCB) {
      failCB();
    }
  });
  await mongoose.connect(process.env.DB_CONNECT_URL);
};
