import { textTranslate } from "../utils";
import { PayloadError } from "../response";
import fetch from "node-fetch";

const addParams = (
  key: string,
  value: string,
  urlsearchParamObject?: URLSearchParams
) => {
  let urlSearchParams;

  if (typeof urlsearchParamObject === undefined) {
    urlSearchParams = new URLSearchParams();
  } else {
    urlSearchParams = urlsearchParamObject;
  }

  urlSearchParams.append(key, value);

  return {
    ...urlSearchParams,
    append: (keyParam: string, valueParam: string) =>
      addParams(keyParam, valueParam, urlSearchParams),
  };
};

interface PapagoTranslatePayload {
  message: {
    "@type": "response";
    "@service": "naverservice.nmt.proxy";
    "@version": "1.0.0";
    result: {
      srcLangType: string;
      tarLangType: string;
      translatedText: string;
      engineType: "N2MT";
      pivot: null | string;
    };
  };
}

const adaptor = (responsePayload: PapagoTranslatePayload) => {
  const {
    message: {
      result: {
        srcLangType: source,
        tarLangType: target,
        translatedText: text,
      },
    },
  } = responsePayload;

  return {
    source,
    target,
    text,
  };
};

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * {
  message: {
    '@type': 'response',
    '@service': 'naverservice.nmt.proxy',
    '@version': '1.0.0',
    result: {
      srcLangType: 'en',
      tarLangType: 'ko',
      translatedText: '값1',
      engineType: 'N2MT',
      pivot: null
    }
  }
 */

/**
  text: string;
  source: string;
  target: string;
*/
export const postTranslate = async (req, res) => {
  const { text, source = "en", target = "ko" } = req.body;
  try {
    if (typeof text === "undefined") {
      throw new PayloadError("PAYLOAD_ERROR", 400);
    }

    const addedParams = new URLSearchParams();
    addedParams.append("source", source);
    addedParams.append("target", target);
    addedParams.append("text", text);

    const response = await fetch("https://openapi.naver.com/v1/papago/n2mt", {
      method: "post",
      body: addedParams,
      headers: {
        "X-Naver-Client-Id": process.env.PAPAGO_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.PAPAGO_CLIENT_SECRET,
      },
    });
    const translateContent = await response.json();

    res.send(adaptor(translateContent));
  } catch (error) {
    if (error instanceof PayloadError) {
      const { status, message } = error;

      return res.status(status).json({ message, status });
    }

    res.send(error);
  }
};
