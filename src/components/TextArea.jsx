import "../styles/components/Box.css";
import { useEffect, useState } from "react";
import { detectedLang, translatedText } from "../translate.js";
import he from "he";
import React from "react";

const TextArea = (props) => {
  const result = props.result;
  const [input, setInput] = useState(null);
  const [inputLang, setInputLang] = useState("English");
  const [output, setOutput] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [code, setCode] = useState("en");

  const handleTranslate = async (input, languageCode) => {
    const response = await translatedText(input, languageCode);
    setOutput(he.decode(response));
  };

  useEffect(() => {
    handleTranslate(input, code);
  }, [input, code]);

  return (
    <div className="textarea">
      <div className="box">
        <select
          name="from"
          id="from"
          value={inputLang}
          onChange={(e) => {
            setInputLang(e.target.value);
          }}
        >
          {result.map((language, index) => {
            return <option key={index}>{language.name}</option>;
          })}
        </select>
        <textarea
          id="fromText"
          placeholder="Enter text"
          onChange={(e) => {
            setInput(e.target.value);
            detectedLang(e.target.value).then((lang) => {
              if (lang !== "und") {
                let newLang = result.filter((languageObj) => {
                  return languageObj.language === lang;
                })[0].name;
                setInputLang(newLang);
              }
            });
          }}
        ></textarea>
      </div>
      <div className="box">
        <select
          name="to"
          id="to"
          value={targetLanguage}
          onChange={(e) => {
            const newLanguage = result.filter((language) => {
              return language.name === e.target.value;
            })[0];
            setCode(newLanguage.language);
            setTargetLanguage(e.target.value);
          }}
        >
          {result.map((language, index) => {
            return <option key={index}>{language.name}</option>;
          })}
        </select>
        <textarea
          id="toText"
          placeholder="Translation"
          value={output}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default TextArea;
