import "./Editpara.css";
import { useEffect, useRef } from "react";

export default function EditableParagraph({
    value,
    onChange,
    tag = "p",
    className = "",
}) {
    const ref = useRef(null);
    const Component = tag;
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
    return (
        <Component
            ref={ref}
            className={className}
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onBlur={handleBlur}
        />
    );
}