import mongoose from "mongoose";

export const connectDB = async (
  successCB?: () => void,
  failCB?: () => void
) => {
  const db = mongoose.connection;
  db.on("connecting", () => {
    console.log("connecting mongoose...");
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
