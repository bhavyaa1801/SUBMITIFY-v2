import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CreateDocumentPage from "./pages/CreateDocumentPage";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./index.css";

export default function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/create"
          element={<CreateDocumentPage />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}