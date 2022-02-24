import { Schema } from "mongoose";
import { audioSchema } from ".";

export const cardSchema = new Schema({
  id: String,
  title: String,
  image: String,
  original: String,
  translated: String,
  native: audioSchema, // Audio,
  recorded: [audioSchema], // Record Schema
});
