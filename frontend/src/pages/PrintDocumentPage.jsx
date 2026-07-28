import { useEffect, useState } from "react";
import DocumentEditor from "../components/editor/DocumentEditor/DocumentEditor";


export default function PrintDocumentPage() {
    //remove
    console.log("PRINT PAGE LOADED");
    window.__PRINT_PAGE_LOADED__ = true;

    const [doc, setDoc] = useState(null);

    useEffect(() => {

        const root = window.document.getElementById("root");
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

        console.log("Waiting for injected document...");

        const interval = setInterval(() => {

            if (window.__SUBMITIFY_DOCUMENT__) {

                console.log("Document received");

                setDoc(window.__SUBMITIFY_DOCUMENT__);

                clearInterval(interval);

            }

        }, 50);

        return () => clearInterval(interval);

    }, []);

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