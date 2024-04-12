import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const TRANSLATE_LANG_URL =
  "https://translation.googleapis.com/language/translate/v2";
const DETECT_LANG_URL =
  "https://translation.googleapis.com/language/translate/v2/detect";
const GET_LANGS_URL =
  "https://translation.googleapis.com/language/translate/v2/languages";

const translatedText = async (text, targetLanguage) => {
  console.log("API KEY", API_KEY);
  const response = await axios.post(`${TRANSLATE_LANG_URL}?key=${API_KEY}`, {
    q: text,
    target: targetLanguage,
  });

  return response.data.data.translations[0].translatedText;
};

const detectedLang = async (text) => {
  console.log("API KEY", API_KEY);
  const detectionResponse = await axios.post(
    `${DETECT_LANG_URL}?key=${API_KEY}`,
    { q: text }
  );

  return detectionResponse.data.data.detections[0][0].language;
};

const allLangs = async () => {
  console.log("API KEY", API_KEY);
  const langs = await axios.post(`${GET_LANGS_URL}?target=en&key=${API_KEY}`);

  return langs.data.data.languages;
};

export { translatedText, detectedLang, allLangs };
