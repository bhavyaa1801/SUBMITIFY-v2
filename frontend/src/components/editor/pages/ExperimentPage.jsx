import "./ExperimentPage.css";

import BlockRenderer from "../blocks/BlockRenderer";
import EditableParagraph from "../blocks/EditableParagraph";
import InsertBlockButton from "../../InsertBlockButton";

import { useDocument } from "../context/DocumentContext";

export default function ExperimentPage({
    experiment,
    experimentIndex,
}) {

    const {
        insertSection,
        updateExperiment,
    } = useDocument();

    return (

        <div className="experiment-page">

            <EditableParagraph
                tag="h1"
                className="experiment-title"
                value={`Experiment ${experiment.number}`}
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
                    onChange={() => {}}
                />

                <EditableParagraph
                    tag="p"
                    value={experiment.question}
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
                                {
                                    title: "Text",
                                    type: "paragraph",
                                    content: "",
                                }
                            )
                        }

                        onInsertCode={() =>
                            insertSection(
                                experimentIndex,
                                index,
                                {
                                    title: "Source Code",
                                    type: "code",
                                    content: "",
                                }
                            )
                        }

                        onInsertImage={() =>
                            insertSection(
                                experimentIndex,
                                index,
                                {
                                    title: "Image",
                                    type: "image",
                                    content: "",
                                }
                            )
                        }

                    />

                </div>

            ))}

        </div>

    );

}