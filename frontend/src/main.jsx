import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import "./index.css";
import App from "./App.jsx";

import { GuideProvider } from "./context/GuideContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GuideProvider>
      <App />
      <Analytics />
      <SpeedInsights />
    </GuideProvider>
  </StrictMode>
);