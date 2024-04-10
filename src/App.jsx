import "../src/styles/App.css";
import Heading from "./components/Heading";
import TextArea from "./components/TextArea";
import { useState, useEffect } from "react";
import { detectedLang, translatedText, allLangs } from "./translate";

function App() {
  const [result, setResult] = useState(null);
  useEffect(() => {
    allLangs().then((res) => {
      setResult(res);
    });
  }, []);
  return (
    <div className="app">
      {result && <Heading result={result}></Heading>}
      <div className="textarea">
        {result && <TextArea result={result}></TextArea>}
      </div>
    </div>
  );
}

export default App;
