const tts = require("@google-cloud/text-to-speech");

const fs = require("fs");
const util = require("util");

const client = new tts.TextToSpeechClient();

async function speech(text: string){
  const request = {
    input: {
      text
    },
    voice: {
      languageCode: "en-US",
      ssmlGender: "NEUTRAL"
    },
    audioConfig: {
      audioEncoding: "MP3",
    }
  }
  try {
    const [response] = await client.synthesizeSpeech(request);
    return response.audioContent
  }
  catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

module.exports = {
  speech,
}