import Page from "../Page/Page";
import ExperimentPage from "../pages/ExperimentPage";

export default function ExperimentPaginator({
    experiment,
    experimentIndex,
}) {
    return (
        <Page>
            <ExperimentPage
                experiment={experiment}
                experimentIndex={experimentIndex}
            />
        </Page>
    );
}