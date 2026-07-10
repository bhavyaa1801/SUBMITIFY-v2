import EditableParagraph from "./EditableParagraph";
import EditableCode from "./EditableCode";
import { useDocument } from "../context/DocumentContext";

// import EditableTable from "./EditableTable";
// import EditableEquation from "./EditableEquation";
// import EditableImage from "./EditableImage";

export default function BlockRenderer({
    section,
    experimentIndex,
    sectionIndex,
}) {

    const { updateSection } = useDocument();

    switch (section.type) {

        case "paragraph":

            return (

                <div className="paragraph-block">

                    <EditableParagraph
                        tag="h2"
                        className="paragraph-title"
                        value={section.title}
                        onChange={(value) =>
                            updateSection(
                                experimentIndex,
                                sectionIndex,
                                {
                                    title: value,
                                }
                            )
                        }
                    />

                    <EditableParagraph
                        tag="p"
                        value={section.content}
                        onChange={(value) =>
                            updateSection(
                                experimentIndex,
                                sectionIndex,
                                {
                                    content: value,
                                }
                            )
                        }
                    />

                </div>

            );

        case "code":

            return (

                <div className="paragraph-block">

                    <EditableParagraph
                        tag="h2"
                        className="paragraph-title"
                        value={section.title}
                        onChange={(value) =>
                            updateSection(
                                experimentIndex,
                                sectionIndex,
                                {
                                    title: value,
                                }
                            )
                        }
                    />

                    <EditableCode
                        value={section.content}
                        onChange={(value) =>
                            updateSection(
                                experimentIndex,
                                sectionIndex,
                                {
                                    content: value,
                                }
                            )
                        }
                    />

                </div>

            );

        // case "image":
        // case "table":
        // case "equation":

        default:

            return null;

    }

}