import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "./Input";
import Display from "./Display";

function App() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Input
              setName={setName}
              setCity={setCity}
              setAge={setAge}
              setMobile={setMobile}
              setEmail={setEmail}
              setCollege={setCollege}
            />
          }
        />

        <Route
          path="/display"
          element={
            <Display
              name={name}
              city={city}
              age={age}
              mobile={mobile}
              email={email}
              college={college}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
