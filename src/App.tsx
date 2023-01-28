import { Routes, Route } from "react-router-dom";

import { Form, Library, SriLanka, EditForm } from "./views";
import { Navigation } from "./components";

function App() {
  return (
    <>
      <Navigation />
      <div>
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/form" element={<Form />} />
          <Route path="/:id" element={<EditForm />} />
          <Route path="/sri-lanka" element={<SriLanka />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
