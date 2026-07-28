import { useEffect, useState } from "react";
import DocumentEditor from "../components/editor/DocumentEditor/DocumentEditor";

export default function PrintDocumentPage() {

    console.log("PRINT PAGE LOADED");
    window.__PRINT_PAGE_LOADED__ = true;

    const [doc, setDoc] = useState(null);

    // White background
    useEffect(() => {

        const root = document.getElementById("root");
        const html = document.documentElement;
        const body = document.body;

        html.style.background = "#fff";
        body.style.background = "#fff";

        if (root) root.style.background = "#fff";

        return () => {

            html.style.background = "";
            body.style.background = "";

            if (root) root.style.background = "";

        };

    }, []);

    // Wait for injected document
    useEffect(() => {

        console.log("Waiting for injected document...");

        // Already injected?
        if (window.__SUBMITIFY_DOCUMENT__) {

            console.log("Document already present");

            setDoc(window.__SUBMITIFY_DOCUMENT__);

        }

        const handle = () => {

            console.log("Received injected document");

            setDoc(window.__SUBMITIFY_DOCUMENT__);

        };

        window.addEventListener(
            "submitify-document-ready",
            handle
        );

        return () => {

            window.removeEventListener(
                "submitify-document-ready",
                handle
            );

        };

    }, []);

    // Notify Puppeteer
    useEffect(() => {

        if (!doc) return;

        requestAnimationFrame(() => {

            console.log("READY");

            window.__SUBMITIFY_READY__ = true;

        });

    }, [doc]);

    if (!doc) {

        return <div>Loading...</div>;

    }

    return (

        <DocumentEditor
            document={doc}
            setDocument={() => {}}
            onExport={() => {}}
            mode="print"
        />

    );

}