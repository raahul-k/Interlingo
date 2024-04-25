import "../styles/components/TextArea.css";
import { useEffect, useState } from "react";
import { detectedLang, translatedText } from "../translate.js";
import he from "he";
import React from "react";

const TextArea = (props) => {
  const result = props.result;
  const [input, setInput] = useState(null);
  const [inputLang, setInputLang] = useState("English");
  const [output, setOutput] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("French");
  const [code, setCode] = useState("fr");
  const [searchBarFlag, setSearchBarFlag] = useState(false);
  const [placeholder, setPlaceholder] = useState("Translate from");
  const [copyMessage, setCopyMessage] = useState("");

  const inputBox = document.querySelector(".display-detected-lang");
  const outputBox = document.querySelector(".display-target-lang");
  const allLanguages = document.querySelectorAll(".list");

  const outputTextArea = document.querySelector("#toText");

  const copyTranslatedText = (div) => {
    if (div.value) {
      div.select();
      document.execCommand("copy");
      document.querySelector(".copy-msg").style.color = "green";
      setCopyMessage("Text copied to clipboard");
    } else {
      document.querySelector(".copy-msg").style.color = "red";
      setCopyMessage("Please enter text to copy!");
    }
    setTimeout(() => {
      setCopyMessage("");
    }, 1000);
  };
  const handleTextAreaHeight = (textArea) => {
    textArea.setAttribute(
      "rows",
      Math.max(2, Math.floor(textArea.value.length / 35))
    );
  };

  const handleTranslate = async (input, languageCode) => {
    const response = await translatedText(input, languageCode);
    setOutput(he.decode(response));
  };

  useEffect(() => {
    handleTranslate(input, code);
  }, [input, code]);

  useEffect(() => {
    handleTextAreaHeight(document.querySelector("#toText"));
  }, [output]);

  const toggleSearchBar = (placeholder) => {
    if (searchBarFlag) {
      setSearchBarFlag(false);
      document.querySelector(".language-panel").style.display = "flex";
      document.querySelector(".text-area").style.display = "flex";
      document.querySelector(".langlist").style.display = "none";
    } else {
      setPlaceholder(placeholder);
      setSearchBarFlag(true);
      document.querySelector("input").setAttribute("autofocus", "");
      document.querySelector(".language-panel").style.display = "none";
      document.querySelector(".text-area").style.display = "none";
      document.querySelector(".langlist").style.display = "grid";
    }
  };

  const handleSearch = (allLanguages, searchQuery) => {
    const query = searchQuery.toLowerCase();
    allLanguages.forEach((language) => {
      const text = language.textContent.toLowerCase();
      if (text.includes(query)) {
        language.style.display = "block";
      } else {
        language.style.display = "none";
      }
    });
  };

  return (
    <div className="textarea">
      <div className="langlist">
        <input
          type="text"
          placeholder={placeholder}
          autoFocus
          onChange={(e) => {
            handleSearch(allLanguages, e.target.value);
          }}
        />
        <div className="langlist-list">
          {result.map((language, index) => {
            return (
              <li
                className="list"
                key={index}
                onClick={(e) => {
                  document.querySelector("input").value = "";
                  handleSearch(allLanguages, "");
                  toggleSearchBar("Translate from");
                  console.log(placeholder);
                  if (placeholder === "Translate from") {
                    setInputLang(e.target.innerText);
                    inputBox.innerText = e.target.innerText;
                  } else {
                    setTargetLanguage(e.target.innerText);
                    setCode(
                      result.filter((language) => {
                        return language.name === e.target.innerText;
                      })[0].language
                    );
                    outputBox.innerText = e.target.innerText;
                  }
                }}
              >
                {language.name}
              </li>
            );
          })}
        </div>
      </div>
      <div className="language-panel">
        <div
          className="display-detected-lang from"
          onClick={(e) => {
            toggleSearchBar(`Translate ${e.target.classList[1]}`);
          }}
        >
          {inputLang}
        </div>
        <div
          className="display-target-lang to"
          onClick={(e) => {
            toggleSearchBar(`Translate ${e.target.classList[1]}`);
          }}
        >
          {targetLanguage}
        </div>
      </div>
      <div className="text-area">
        <textarea
          id="fromText"
          placeholder="Enter text"
          onChange={(e) => {
            setInput(e.target.value);
            handleTextAreaHeight(e.target);
            detectedLang(e.target.value).then((lang) => {
              if (lang !== "und") {
                let newLang = result.filter((languageObj) => {
                  return languageObj.language === lang;
                })[0].name;
                setInputLang(newLang);
                inputBox.innerText = newLang;
              }
            });
          }}
        ></textarea>

        <textarea
          id="toText"
          placeholder="Translation"
          value={output}
          readOnly
          onChange={(e) => {
            console.log("Cnonsole log", e.target.value);
            handleTextAreaHeight(e.target);
          }}
        ></textarea>
        <div className="copy-button">
          <img
            className="copy-icon"
            src="copy-link-icon.svg"
            alt=""
            onClick={(e) => {
              copyTranslatedText(outputTextArea);
            }}
          />
        </div>
      </div>
      <div className="copy-msg">{copyMessage}</div>
    </div>
  );
};

export default TextArea;
