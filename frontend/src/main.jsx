import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { GuideProvider } from "./context/GuideContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GuideProvider>
      <App />
    </GuideProvider>
  </StrictMode>
);