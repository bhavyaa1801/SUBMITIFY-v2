import { useEffect, useState } from "react";

import DocumentEditor from "../components/editor/DocumentEditor/DocumentEditor";

export default function PrintDocumentPage() {

    const [document, setDocument] = useState(
        window.__SUBMITIFY_DOCUMENT__ || null
    );

    useEffect(() => {

        console.log("Mounted Print Page");

        const handleDocumentReady = () => {

            console.log("EVENT RECEIVED");

            console.log(window.__SUBMITIFY_DOCUMENT__);

            setDocument(window.__SUBMITIFY_DOCUMENT__);

        };

        window.addEventListener(
            "submitify-document-ready",
            handleDocumentReady
        );

        return () => {

            window.removeEventListener(
                "submitify-document-ready",
                handleDocumentReady
            );

        };

    }, []);
    useEffect(() => {

        console.log("Document changed", document);

        if (!document) return;

        console.log("READY");

        window.__SUBMITIFY_READY__ = true;

    }, [document]);

    if (!document) {

        return (

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    fontFamily: "sans-serif",
                }}
            >
                Loading document...
            </div>

        );

    }

    return (

        <DocumentEditor
            document={document}
            setDocument={() => { }}
            onExport={() => { }}
            mode="print"
        />

    );

}