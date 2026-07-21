import "./Editpara.css";

import { useEffect, useRef } from "react";

import { useDocument } from "../context/DocumentContext";
import { useEditorMode } from "../context/EditorModeContext";



export default function EditableCode({
    value,
    onChange,
    defaultStyle = {},
    style = {},
    experimentIndex,
    sectionIndex,
    role,
}) {

    const ref = useRef(null);

    const { isPrint } = useEditorMode();

    const { setActiveSection } = useDocument();

    useEffect(() => {

        if (
            !isPrint &&
            ref.current &&
            ref.current.innerText !== (value ?? "")
        ) {

            ref.current.innerText = value ?? "";

        }

    }, [value, isPrint]);

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
            type: "code",

        });

    };

    const commonStyle = {

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
                : "none",

        textAlign:
            style.align ||
            defaultStyle.textAlign,

        fontSize:
            style.fontSize ||
            defaultStyle.fontSize,

    };

    // ============================
    // PRINT MODE
    // ============================

    if (isPrint) {

        return (

            <pre
                className="code-block code-block-print"
                style={commonStyle}
            >
                {value ?? ""}
            </pre>

        );

    }

    // ============================
    // EDIT MODE
    // ============================

    return (

        <pre
            ref={ref}
            className="code-block"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={commonStyle}
        />

    );

}