import "./DocumentEditor.css";
import "../styles/print.css";

import { DocumentProvider } from "../context/DocumentContext";
import { EditorModeProvider } from "../context/EditorModeContext";

import EditorToolbar from "../toolbar/EditorToolbar";
import DocumentRenderer from "../layout/DocumentRenderer";

function DocumentEditor({
    document,
    setDocument,
    onExport,
    mode = "edit",
}) {

    const isPrint = mode === "print";

    return (

        <DocumentProvider
            document={document}
            setDocument={setDocument}
        >

            <EditorModeProvider mode={mode}>

                {!isPrint && (
                    <EditorToolbar
                        onExport={onExport}
                    />
                )}

                <main
                    className={`document-workspace ${
                        isPrint ? "document-print" : ""
                    }`}
                >

                    <DocumentRenderer
                        document={document}
                    />

                </main>

            </EditorModeProvider>

        </DocumentProvider>

    );

}

export default DocumentEditor;