import { Schema, model } from "mongoose";

// FIXME aws s3
const root = "/"; // s3

export const userSchema = new Schema({
  id: {
    type: String,
    default: Schema.Types.ObjectId,
  },
  name: String,
  image: {
    type: String,
    // see https://mongoosejs.com/docs/schematypes.html#getters
    get: (v) => `${root}${v}`,
  },
  recentCardCreatedAt: String,
});

export const User = model("User", userSchema);
