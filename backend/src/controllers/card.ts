import { Card, User } from "../models";
import { DateTime } from "luxon";

export const createCard = async (req, res) => {
  const { title, original, image, translated, native } = req.body;
  const { year, month, day } = DateTime.now();
  try {
    const userDocs = await User.findOne({ name: "" }).exec();

    if (userDocs.recentCardCreatedAt === `${year}.${month}.${day}`) {
      res.status(400).json({
        message: "maximum exceeded creation card numbers",
      });
    } else {
      await Card.create({
        title,
        image: "/some-s3-url",
        original,
        translated,
        native,
      });

      res.status(200).json({
        message: "creat success",
      });
    }
  } catch (error) {}
};
