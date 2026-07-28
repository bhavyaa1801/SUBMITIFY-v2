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

        useEffect(() => {

            if (window.__SUBMITIFY_DOCUMENT__) {
                setDoc(window.__SUBMITIFY_DOCUMENT__);
            }

            const handle = () => {
                setDoc(window.__SUBMITIFY_DOCUMENT__);
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
            setDocument={() => { }}
            onExport={() => { }}
            mode="print"
        />

    );

}