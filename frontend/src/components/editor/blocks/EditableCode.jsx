import "./Editpara.css";

import { useEffect, useRef } from "react";

import { useDocument } from "../context/DocumentContext";

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

        onChange?.(
            e.currentTarget.innerText
        );

    };

    const handleFocus = () => {

        setActiveSection({

            experimentIndex,
            sectionIndex,
            role,
            type: "code",

        });

    };

    return (

        <pre
            ref={ref}
            className="code-block"
            contentEditable
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
                        : "none",

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