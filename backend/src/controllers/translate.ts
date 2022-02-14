import { speech } from "../utils";
import { PayloadError } from "../response";

export const postTranslate = async (req, res, next) => {
  const { text } = req.body;

  try {
    if (typeof text === "undefined") {
      throw new PayloadError("PAYLOAD_ERROR", 400);
    }

    const audioContent = await speech(text);
    res.send(audioContent);
  } catch (error) {
    if (error instanceof PayloadError) {
      const { status, message } = error;

      return res.status(status).json({ message, status });
    }
    res.send(error);
  }
};
