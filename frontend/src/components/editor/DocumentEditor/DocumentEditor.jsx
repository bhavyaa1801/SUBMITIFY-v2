import "./DocumentEditor.css";
import "../styles/print.css";

import { DocumentProvider } from "../context/DocumentContext";
import { EditorModeProvider } from "../context/EditorModeContext";

import EditorToolbar from "../toolbar/EditorToolbar";
import DocumentRenderer from "../layout/DocumentRenderer";

import { useState } from "react";
import ExportProgress from "../../ExportProgress/ExportProgress";

function DocumentEditor({
    document,
    setDocument,
    onExport,
    mode = "edit",
}) {

    const isPrint = mode === "print";
    const [exporting, setExporting] = useState(false);

    return (

        <DocumentProvider
            document={document}
            setDocument={setDocument}
        >

            <EditorModeProvider mode={mode}>

                {!isPrint && (
                    <EditorToolbar
                        exporting={exporting}
                        onExport={async (doc) => {
                            setExporting(true);
                            try {
                                await onExport(doc);
                            } catch (err) {
                                alert("Failed to export PDF.");
                            } finally {
                                setExporting(false);
                            }
                        }}
                    />
                )}

                <main
                    className={`document-workspace ${isPrint ? "document-print" : ""
                        }`}
                >

                    <DocumentRenderer
                        document={document}
                    />
                    <ExportProgress
                        open={exporting}
                    />

                </main>

            </EditorModeProvider>

        </DocumentProvider>

    );

}

export default DocumentEditor;