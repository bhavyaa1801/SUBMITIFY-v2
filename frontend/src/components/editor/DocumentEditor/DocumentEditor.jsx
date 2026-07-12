import "./DocumentEditor.css";

import Page from "../Page/Page";

import CoverPage from "../pages/CoverPage";
import IndexPage from "../pages/IndexPage";
import ExperimentPage from "../pages/ExperimentPage";

import { DocumentProvider } from "../context/DocumentContext";

import EditorToolbar from "../toolbar/EditorToolbar";

function DocumentEditor({
    document,
    setDocument,
    onExport,
}) {

    return (

        <DocumentProvider
            document={document}
            setDocument={setDocument}
        >

            <EditorToolbar
                onExport={onExport}
            />

            <main className="document-workspace">

                <div className="document-editor">

                    <Page>
                        <CoverPage
                            metadata={document.metadata}
                        />
                    </Page>

                    <Page>
                        <IndexPage
                            experiments={document.experiments}
                        />
                    </Page>

                    {document.experiments.map((experiment, index) => (

                        <Page key={experiment.number}>

                            <ExperimentPage
                                experiment={experiment}
                                experimentIndex={index}
                            />

                        </Page>

                    ))}

                </div>

            </main>

        </DocumentProvider>

    );

}

export default DocumentEditor;