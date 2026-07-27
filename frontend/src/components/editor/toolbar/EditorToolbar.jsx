import "./Toolbar.css";

import { useDocument } from "../context/DocumentContext";

export default function EditorToolbar({
    onExport,
    exporting,
}) {

    const {
        document,
        activeSection,
        updateSectionStyle,
    } = useDocument();

    let selected = null;

    if (

        activeSection &&
        activeSection.experimentIndex !== undefined &&
        activeSection.sectionIndex !== undefined

    ) {

        selected =
            document.experiments[
                activeSection.experimentIndex
            ]?.sections?.[
            activeSection.sectionIndex
            ] ?? null;

    }

    const isParagraph =
        selected?.type === "paragraph" ||
        activeSection?.type === "text";

    const isImage =
        selected?.type === "image";

    const hasSelection =
        activeSection !== null;

    const canEditSection =
        selected &&
        activeSection?.experimentIndex !== undefined &&
        activeSection?.sectionIndex !== undefined;

    const role =
        activeSection?.role || "content";

    const currentStyle =
        selected?.style?.[role] || {};

    const toggleStyle = (key) => {

        if (!canEditSection) return;

        updateSectionStyle(

            activeSection.experimentIndex,

            activeSection.sectionIndex,

            role,

            {

                [key]: !currentStyle[key],

            }

        );

    };

    const changeFontSize = (delta) => {

        if (!canEditSection) return;

        updateSectionStyle(

            activeSection.experimentIndex,

            activeSection.sectionIndex,

            role,

            {

                fontSize: Math.max(

                    12,

                    (currentStyle.fontSize || 16) + delta

                ),

            }

        );

    };

    const changeAlignment = (align) => {

        if (!canEditSection) return;

        updateSectionStyle(
            activeSection.experimentIndex,
            activeSection.sectionIndex,
            role,
            {
                align,
            }

        );

    };

    const changeImageWidth = (delta) => {
        if (!canEditSection) return;
        updateSectionStyle(
            activeSection.experimentIndex,
            activeSection.sectionIndex,
            "content",
            {
                width: Math.max(
                    100,
                    (currentStyle.width || 350) + delta
                ),
            }
        );
    };

    return (
        <aside className="editor-toolbar">
            <div className="toolbar-header">
                <h2>📝 Editor</h2>
                <p>
                    {
                        selected
                            ? `Editing ${selected.type} (${role})`
                            : "✨ Select a block to start editing"
                    }
                </p>
            </div>
            <div className="toolbar-divider" />
            <div className="tool-section">
                <span className="tool-heading">
                    Text Formatting
                </span>
                <div className="tool-grid">
                    <button
                        className={currentStyle.bold ? "active" : ""}
                        disabled={!isParagraph}
                        onClick={() => toggleStyle("bold")}
                    >
                        B
                    </button>

                    <button
                        className={currentStyle.italic ? "active" : ""}
                        disabled={!isParagraph}
                        onClick={() => toggleStyle("italic")}
                    >
                        I
                    </button>

                    <button
                        className={currentStyle.underline ? "active" : ""}
                        disabled={!isParagraph}
                        onClick={() => toggleStyle("underline")}
                    >
                        U
                    </button>

                </div>

            </div>

            <div className="tool-section">

                <span className="tool-heading">
                    Font Size
                </span>

                <div className="tool-grid">

                    <button
                        disabled={!isParagraph}
                        onClick={() => changeFontSize(1)}
                    >
                        A+
                    </button>

                    <button
                        disabled={!isParagraph}
                        onClick={() => changeFontSize(-1)}
                    >
                        A-
                    </button>

                </div>

            </div>

            <div className="tool-section">

                <span className="tool-heading">
                    Alignment
                </span>

                <div className="tool-grid">

                    <button
                        disabled={!hasSelection}
                        onClick={() => changeAlignment("left")}
                    >
                        ⬅ Left
                    </button>

                    <button
                        disabled={!hasSelection}
                        onClick={() => changeAlignment("center")}
                    >
                        ⬌ Center
                    </button>

                    <button
                        disabled={!hasSelection}
                        onClick={() => changeAlignment("right")}
                    >
                        ➡ Right
                    </button>

                </div>

            </div>

            <div className="tool-section">

                <span className="tool-heading">

                    Image

                </span>

                <div className="image-size-control">

                    <button
                        disabled={!isImage}
                        onClick={() => changeImageWidth(-20)}
                    >
                        −
                    </button>

                    <span className="image-size-value">

                        {currentStyle.width || 350}px

                    </span>

                    <button
                        disabled={!isImage}
                        onClick={() => changeImageWidth(20)}
                    >
                        +

                    </button>

                </div>

                <button
                    className="replace-image-btn"
                    disabled={!isImage}
                >

                </button>

            </div>

            <div className="toolbar-footer">

                <button
                    className="export-btn"
                    disabled={exporting}
                    onClick={() => onExport(document)}
                >
                    {exporting
                        ? "⏳ Exporting..."
                        : "📄 Export PDF"}
                </button>

            </div>

        </aside>

    );

}