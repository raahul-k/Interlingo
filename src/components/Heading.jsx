import "../styles/components/Heading.css";
import { translatedText } from "../translate.js";
import { useState, useEffect, useRef } from "react";
import React from "react";

const Heading = (props) => {
  // const result = props.result;
  // const [language, setLanguage] = useState("");

  // useEffect(() => {
  //   console.log("Useeffect ran");
  //   for (let i = 20; i < 40; i++) {
  //     setTimeout(async () => {
  //       const code = result[i].language;
  //       const phrase = await translatedText("Text translator", code);
  //       setLanguage(phrase);
  //     }, (i - 20) * 3000);
  //   }
  // }, []);

  // const speed = 50;
  // const typingRef = useRef(null);

  // useEffect(() => {
  //   let index = 0;
  //   setTimeout(() => {
  //     const typingInterval = setInterval(() => {
  //       if (index < language.length) {
  //         typingRef.current.textContent += language.charAt(index);
  //         index++;
  //       } else {
  //         clearInterval(typingInterval);
  //       }
  //     }, speed);

  //     return () => clearInterval(typingInterval);
  //   }, 0);

  //   setTimeout(() => {
  //     const reverseTypingInterval = setInterval(() => {
  //       if (index > 0) {
  //         typingRef.current.textContent = typingRef.current.textContent.slice(
  //           0,
  //           index - 1
  //         );
  //         index--;
  //       } else {
  //         clearInterval(reverseTypingInterval);
  //       }
  //     }, speed);

  //     return () => clearInterval(reverseTypingInterval);
  //   }, speed * language.length + 200);
  // }, [language]);

  return (
    <div className="heading">
      <h1>Text translator</h1>
      {/* <div className="slash"></div>
      <h1 ref={typingRef}></h1> */}
    </div>
  );
};

export default Heading;
