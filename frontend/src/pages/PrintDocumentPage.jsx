import { useEffect, useState } from "react";
import DocumentEditor from "../components/editor/DocumentEditor/DocumentEditor";

export default function PrintDocumentPage() {
  const [document, setDocument] = useState(window.__SUBMITIFY_DOCUMENT__ || null);

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
    const handleDocumentReady = () => setDocument(window.__SUBMITIFY_DOCUMENT__);
    window.addEventListener("submitify-document-ready", handleDocumentReady);

    // signal ready as soon as document is set and React has painted —
    // no Paged.js step to wait for anymore
    return () => window.removeEventListener("submitify-document-ready", handleDocumentReady);
  }, []);

  useEffect(() => {
    if (!document) return;
    requestAnimationFrame(() => {
      window.__SUBMITIFY_READY__ = true;
    });
  }, [document]);

  if (!document) return <div>Loading document...</div>;

  return (
    <DocumentEditor
      document={document}
      setDocument={() => {}}
      onExport={() => {}}
      mode="print"
    />
  );
}