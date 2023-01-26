import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Form, Library, SriLanka } from "./views";
import { Navigation } from "./components";

function App() {
  return (
    <>
      <Navigation />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/library" element={<Library />} />
          <Route path="/sri-lanka" element={<SriLanka />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
