
import React, { useState } from "react";
import "./App.css";
import Buttons from "./Components/Buttons";

function App() {
  const [text, setText] = useState("");

  return (
    <div>
  

      <Buttons />
    </div>
  );
}

export default App;
