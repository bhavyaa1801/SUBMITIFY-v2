import { useEffect, useState } from "react";
import DocumentEditor from "../components/editor/DocumentEditor/DocumentEditor";

export default function PrintDocumentPage() {

    const [document, setDocument] = useState(null);

    useEffect(() => {

        const root = document.getElementById("root");
        const html = window.document.documentElement;
        const body = window.document.body;

        html.style.background = "#fff";
        body.style.background = "#fff";

        if (root) root.style.background = "#fff";

        return () => {

            html.style.background = "";
            body.style.background = "";

            if (root) root.style.background = "";

        };

    }, []);

    useEffect(() => {

        console.log("Print page mounted");

        // ⭐ IMPORTANT
        if (window.__SUBMITIFY_DOCUMENT__) {

            console.log("Document already available");

            setDocument(window.__SUBMITIFY_DOCUMENT__);

        }

        const handle = () => {

            console.log("Received document event");

            setDocument(window.__SUBMITIFY_DOCUMENT__);

        };

        window.addEventListener(
            "submitify-document-ready",
            handle
        );

        return () =>
            window.removeEventListener(
                "submitify-document-ready",
                handle
            );

    }, []);

    useEffect(() => {

        console.log("Document changed", document);

        if (!document) return;

        requestAnimationFrame(() => {

            console.log("READY");

            window.__SUBMITIFY_READY__ = true;

        });

    }, [document]);

    if (!document) {

        return <div>Loading...</div>;

    }

    return (

        <DocumentEditor
            document={document}
            setDocument={() => {}}
            onExport={() => {}}
            mode="print"
        />

    );

}