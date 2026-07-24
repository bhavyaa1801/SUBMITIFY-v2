import Page from "../Page/Page";

import CoverPage from "../pages/CoverPage";
import IndexPage from "../pages/IndexPage";

import ExperimentPaginator from "../pagination/ExperimentPaginator";

export default function DocumentRenderer({
    document,
}) {

    if (!document) {
        return null;
    }

    return (

        <div className="document-editor">

            {/* Cover */}

            <Page>

                <CoverPage />

            </Page>

            {/* Index */}

            <Page>

                <IndexPage />

            </Page>

            {/* Experiments */}

            {document.experiments.map((experiment, index) => (

                <ExperimentPaginator

                    key={`${experiment.number}-${index}`}

                    experiment={experiment}

                    experimentIndex={index}

                />

            ))}

        </div>

    );

}