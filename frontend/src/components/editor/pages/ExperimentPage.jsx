import "./ExperimentPage.css";

import BlockRenderer from "../blocks/BlockRenderer";
import EditableParagraph from "../blocks/EditableParagraph";
import InsertBlockButton from "../../InsertBlockButton";

import { useDocument } from "../context/DocumentContext";
import { Theme } from "../theme/theme";
import { createSection } from "../utils/createSection";

export default function ExperimentPage({
    experiment,
    experimentIndex,
}) {

    const {
        insertSection,
        updateExperiment,
    } = useDocument();

    return (

        <div
            className="experiment-page"
            style={Theme.document}
        >

            <EditableParagraph
                tag="h1"
                className="experiment-title"
                value={`Experiment ${experiment.number}`}
                defaultStyle={Theme.experiment.title}
                onChange={(value) => {

                    const match = value.match(/\d+/);

                    updateExperiment(
                        experimentIndex,
                        {
                            number: match
                                ? Number(match[0])
                                : experiment.number,
                        }
                    );

                }}
            />

            <div className="experiment-question">

                <EditableParagraph
                    tag="h2"
                    className="experiment-question-title"
                    value="AIM"
                    defaultStyle={Theme.experiment.aimHeading}
                    onChange={() => {}}
                />

                <EditableParagraph
                    tag="p"
                    value={experiment.question}
                    defaultStyle={Theme.experiment.question}
                    onChange={(value) =>
                        updateExperiment(
                            experimentIndex,
                            {
                                question: value,
                            }
                        )
                    }
                />

            </div>

            {experiment.sections.map((section, index) => (

                <div key={index}>

                    <BlockRenderer
                        section={section}
                        experimentIndex={experimentIndex}
                        sectionIndex={index}
                    />

                    <InsertBlockButton

                        onInsertParagraph={() =>
                            insertSection(
                                experimentIndex,
                                index,
                                createSection(
                                    "paragraph",
                                    "Text"
                                )
                            )
                        }

                        onInsertCode={() =>
                            insertSection(
                                experimentIndex,
                                index,
                                createSection(
                                    "code",
                                    "Source Code"
                                )
                            )
                        }

                        onInsertImage={() =>
                            insertSection(
                                experimentIndex,
                                index,
                                createSection(
                                    "image",
                                    "Image"
                                )
                            )
                        }

                    />

                </div>

            ))}

        </div>

    );

}