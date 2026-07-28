import "./DocumentEditor.css";
import "../styles/print.css";

import { useEffect, useState } from "react";

import { DocumentProvider } from "../context/DocumentContext";
import { EditorModeProvider } from "../context/EditorModeContext";

import EditorToolbar from "../toolbar/EditorToolbar";
import DocumentRenderer from "../layout/documentrenderer";

import ExportProgress from "../../ExportProgress/ExportProgress";

import GuideModal from "../../Help/GuideModal";
import HelpButton from "../../Help/HelpButton";

function DocumentEditor({
    document,
    setDocument,
    onExport,
    mode = "edit",
}) {

    const isPrint = mode === "print";

    const [exporting, setExporting] = useState(false);

    const [showGuide, setShowGuide] = useState(false);

    const [showLearnMore, setShowLearnMore] = useState(false);

    useEffect(() => {

        if (isPrint) return;

        const seen = localStorage.getItem(
            "submitify-guide-seen"
        );

        if (!seen) {

            setShowGuide(true);

        }

    }, [isPrint]);

    const closeGuide = () => {

        localStorage.setItem(
            "submitify-guide-seen",
            "true"
        );

        setShowGuide(false);

    };

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
                    className={`document-workspace ${
                        isPrint ? "document-print" : ""
                    }`}
                >

                    <DocumentRenderer
                        document={document}
                    />

                    {!isPrint && (

                        <GuideModal

                            open={showGuide}

                            onClose={closeGuide}

                            onLearnMore={() =>
                                setShowLearnMore(true)
                            }

                        />

                    )}

                    {!isPrint && !showGuide && (

                        <HelpButton

                            onClick={() =>
                                setShowGuide(true)
                            }

                        />

                    )}

                    <ExportProgress
                        open={exporting}
                    />

                </main>

            </EditorModeProvider>

        </DocumentProvider>

    );

}

export default DocumentEditor;