import "./Editpara.css";
import { useState, useRef, useEffect } from "react";

import { useDocument } from "../context/DocumentContext";
import { useEditorMode } from "../context/EditorModeContext";

export default function SectionEditor({
    experimentIndex,
    sectionIndex,
    children,
}) {

    const {
        deleteSection,
        duplicateSection,
        moveSectionUp,
        moveSectionDown,
        activeSection,
        setActiveSection,
    } = useDocument();

    const { isPrint } = useEditorMode();

    // ✅ Hooks must always be called
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const isActive =
        activeSection?.experimentIndex === experimentIndex &&
        activeSection?.sectionIndex === sectionIndex;

    useEffect(() => {

        if (isPrint) return;

        function handleClickOutside(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, [isPrint]);

    // ✅ Return AFTER all hooks
    if (isPrint) {
        return children;
    }

    return (

        <div
            className={`section-editor ${isActive ? "active-section" : ""}`}
            onClick={() => {

                setActiveSection({
                    experimentIndex,
                    sectionIndex,
                });

            }}
        >

            <div ref={menuRef}>

                <button
                    className="section-menu-button"
                    onClick={(e) => {

                        e.stopPropagation();
                        setOpen(prev => !prev);

                    }}
                >
                    ⋮⋮
                </button>

                {open && (

                    <div className="section-menu">

                        <button
                            onClick={() => {

                                duplicateSection(
                                    experimentIndex,
                                    sectionIndex
                                );

                                setOpen(false);

                            }}
                        >
                            Duplicate
                        </button>

                        <button
                            onClick={() => {

                                deleteSection(
                                    experimentIndex,
                                    sectionIndex
                                );

                                setOpen(false);

                            }}
                        >
                            Delete
                        </button>

                        <hr />

                        <button
                            onClick={() => {

                                moveSectionUp(
                                    experimentIndex,
                                    sectionIndex
                                );

                                setOpen(false);

                            }}
                        >
                            Move Up
                        </button>

                        <button
                            onClick={() => {

                                moveSectionDown(
                                    experimentIndex,
                                    sectionIndex
                                );

                                setOpen(false);

                            }}
                        >
                            Move Down
                        </button>

                    </div>

                )}

            </div>

            {children}

        </div>

    );

}