import tts from "@google-cloud/text-to-speech";
import { google } from "@google-cloud/text-to-speech/build/protos/protos";

const client = new tts.TextToSpeechClient();

async function speech(
  text: google.cloud.texttospeech.v1.ISynthesisInput["text"]
) {
  const request = {
    input: {
      text,
    },
    voice: {
      languageCode: "en-US",
      ssmlGender: "FEMALE",
    },
    audioConfig: {
      audioEncoding: "LINEAR16",
      speakingRate: 1,
    },
  };
  try {
    // @ts-ignore
    const [response] = await client.synthesizeSpeech(request);
    return response.audioContent;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export { speech };
