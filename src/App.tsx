import React from "react";
import { Routes, Route } from "react-router-dom";

import { Form, Files, Library, SriLanka } from "./views";
import { Navigation } from "./components";

import { withAuthenticator } from "@aws-amplify/ui-react";

function App({ signOut }: any) {
  return (
    <>
      <Navigation signOut={signOut} />
      <div>
        <Routes>
          <Route path="/" element={<Files />} />
          <Route path="/form" element={<Form />} />
          <Route path="/library" element={<Library />} />
          <Route path="/sri-lanka" element={<SriLanka />} />
        </Routes>
      </div>
    </>
  );
}

export default withAuthenticator(App);
