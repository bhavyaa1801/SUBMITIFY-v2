import "./Editpara.css";
import { useEffect, useRef } from "react";

import { useDocument } from "../context/DocumentContext";

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

        onChange?.(
            e.currentTarget.innerText
        );

    };

    const handleFocus = () => {

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