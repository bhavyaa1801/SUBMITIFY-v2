import "./DocumentEditor.css";
import Page from "../Page/Page";
import CoverPage from "../pages/CoverPage";
import IndexPage from "../pages/IndexPage";
import ExperimentPage from "../pages/ExperimentPage";

import { DocumentProvider } from "../context/DocumentContext";
import Toolbar from "../toolbar/Toolbar";


function DocumentEditor({ document, setDocument, onExport, onBack }) {
    return (
        <DocumentProvider document={document}
            setDocument={setDocument}>
                
            <Toolbar
                onBack={onBack}
                onExport={onExport}
            />

            <div className="document-editor">
                <Page>
                    <CoverPage metadata={document.metadata} />
                </Page>
                <Page>
                    <IndexPage experiments={document.experiments} />
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
        </DocumentProvider>



    );
}

export default DocumentEditor;