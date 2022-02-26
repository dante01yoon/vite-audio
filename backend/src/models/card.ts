import { Schema, model } from "mongoose";
import { audioSchema } from ".";

export const cardSchema = new Schema({
  id: {
    type: String,
    default: Schema.Types.ObjectId,
  },
  title: String,
  image: {
    type: String,
    // see https://mongoosejs.com/docs/schematypes.html#getters
    get: (v) => `${process.env.IMAGE_URL}${v}`,
  },
  original: String,
  translated: String,
  native: audioSchema, // Audio,
  recorded: [audioSchema], // Record Schema
});

export const Card = model("Card", cardSchema);
