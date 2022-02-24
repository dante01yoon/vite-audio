import { Schema } from "mongoose";

export const userSchema = new Schema({
  id: String,
  name: String,
  image: String,
});
