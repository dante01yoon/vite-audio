import { Schema, model } from "mongoose";

export const audioSchema = new Schema({
  id: String,
  title: String,
  author: String,
  original: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  meta: {
    audio: Buffer,
  },
});

export const Audio = model("Audio", audioSchema);
