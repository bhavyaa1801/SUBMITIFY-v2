import "./Editpara.css";
import { useEffect, useRef } from "react";

import { useDocument } from "../context/DocumentContext";
import { useEditorMode } from "../context/EditorModeContext";


export default function EditableParagraph({
    value,
    onChange,
    defaultStyle = {},
    style = {},
    tag = "p",
    className = "",
    experimentIndex,
    sectionIndex,
    role,
}) {

    const ref = useRef(null);
    const { isPrint } = useEditorMode();

    const Component = tag;

    const {
        setActiveSection,
    } = useDocument();

    useEffect(() => {

        if (
            ref.current &&
            ref.current.innerText !== (value ?? "")
        ) {
            ref.current.innerText = value ?? "";
        }

    }, [value]);

    const handleBlur = (e) => {

        if (isPrint) return;

        onChange?.(
            e.currentTarget.innerText
        );

    };

    const handleFocus = () => {

        if (isPrint) return;

        setActiveSection({
            experimentIndex,
            sectionIndex,
            role,
            type: "text",
        });

    };

    return (

        <Component
            ref={ref}
            className={className}
            contentEditable={!isPrint}
            suppressContentEditableWarning
            spellCheck={false}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{

                ...defaultStyle,

                fontWeight:
                    style.bold
                        ? "700"
                        : defaultStyle.fontWeight || "400",

                fontStyle:
                    style.italic
                        ? "italic"
                        : "normal",

                textDecoration:
                    style.underline
                        ? "underline"
                        : defaultStyle.textDecoration || "none",

                textAlign:
                    style.align ||
                    defaultStyle.textAlign,

                fontSize:
                    style.fontSize ||
                    defaultStyle.fontSize,

            }}
        />

    );

}