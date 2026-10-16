
import React, { useState } from "react";
import "./App.css";
import Buttons from "./Components/Buttons";

function App() {
  const [text, setText] = useState("");

  return (
    <div>
      <h2>{text}</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />

      <Buttons />
    </div>
  );
}

export default App;
