import EditableParagraph from "./EditableParagraph";
import EditableCode from "./EditableCode";
import EditableImage from "./EditableImage";
import SectionEditor from "./SectionEditor";

import { useDocument } from "../context/DocumentContext";

import { Theme } from "../theme/theme";

export default function BlockRenderer({
    section,
    experimentIndex,
    sectionIndex,
}) {

    const { updateSection } = useDocument();

    switch (section.type) {

        case "paragraph":

            return (

                <SectionEditor
                    experimentIndex={experimentIndex}
                    sectionIndex={sectionIndex}
                >

                    <div className="paragraph-block">

                        <EditableParagraph
                            tag="h2"
                            className="paragraph-title"
                            value={section.title}
                            defaultStyle={Theme.paragraph.title}
                            style={section.style?.title || {}}
                            experimentIndex={experimentIndex}
                            sectionIndex={sectionIndex}
                            role="title"
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
                            defaultStyle={Theme.paragraph.content}
                            style={section.style?.content || {}}
                            experimentIndex={experimentIndex}
                            sectionIndex={sectionIndex}
                            role="content"
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

                </SectionEditor>

            );

        case "code":

            return (

                <SectionEditor
                    experimentIndex={experimentIndex}
                    sectionIndex={sectionIndex}
                >

                    <div className="paragraph-block">

                        <EditableParagraph
                            tag="h2"
                            className="paragraph-title"
                            value={section.title}
                            defaultStyle={Theme.code.title}
                            style={section.style?.title || {}}
                            experimentIndex={experimentIndex}
                            sectionIndex={sectionIndex}
                            role="title"
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
                            defaultStyle={Theme.code.content}
                            style={section.style?.content || {}}
                            experimentIndex={experimentIndex}
                            sectionIndex={sectionIndex}
                            role="content"
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

                </SectionEditor>

            );

        case "image":

            return (

                <SectionEditor
                    experimentIndex={experimentIndex}
                    sectionIndex={sectionIndex}
                >

                    <div className="paragraph-block">

                        <EditableParagraph
                            tag="h2"
                            className="paragraph-title"
                            value={section.title}
                            defaultStyle={Theme.paragraph.title}
                            style={section.style?.title || {}}
                            experimentIndex={experimentIndex}
                            sectionIndex={sectionIndex}
                            role="title"
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

                        <EditableImage
                            value={section.content}
                            style={section.style?.content || {}}
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

                </SectionEditor>

            );

        default:

            return null;

    }

}