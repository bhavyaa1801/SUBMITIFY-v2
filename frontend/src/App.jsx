import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CreateDocumentPage from "./pages/CreateDocumentPage";
import PrintDocumentPage from "./pages/PrintDocumentPage";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./index.css";

function AppContent() {

    const location = useLocation();

    const isPrint = location.pathname === "/print";

    return (
        <>
            {!isPrint && <Header />}

            <Routes>

                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/create"
                    element={<CreateDocumentPage />}
                />

                <Route
                    path="/print"
                    element={<PrintDocumentPage />}
                />

            </Routes>

            {!isPrint && <Footer />}
        </>
    );
}

export default function App() {

    return (

        <BrowserRouter>

            <AppContent />

        </BrowserRouter>

    );

}