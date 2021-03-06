import * as GoogleTranslate from "@google-cloud/translate";

const { Translate } = GoogleTranslate.v2;

const { translate } = new Translate();

// 이름이 영..
/**
 *
 * @param text
 * @param target "en" | "ko"
 */
export const textTranslate = async (
  text: string,
  target: "en" | "ko" | "ru" = "ko"
) => {
  const options = {
    to: target,
    model: "nmt",
  };
  try {
    let [translations] = await translate(text, options);
    return translations;
  } catch (error) {
    return Promise.reject(error);
  }
};
