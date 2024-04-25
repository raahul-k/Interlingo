import "../styles/components/Heading.css";
import { translatedText } from "../translate.js";
import { useState, useEffect, useRef } from "react";
import React from "react";

const Heading = () => {
  return (
    <div className="heading">
      <img src="app-icon.svg" alt="" className="logo" />
      <h1>Interlingo</h1>
    </div>
  );
};

export default Heading;
