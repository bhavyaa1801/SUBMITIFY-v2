import "./Editpara.css";

import { useEffect, useRef } from "react";

export default function EditableCode({
    value,
    onChange,
}) {

    const ref = useRef(null);

    useEffect(() => {

        if (
            ref.current &&
            ref.current.innerText !== (value ?? "")
        ) {
            ref.current.innerText = value ?? "";
        }

    }, [value]);

    const handleBlur = (e) => {
        onChange?.(e.currentTarget.innerText);
    };

    return (

        <pre
            ref={ref}
            className="code-block"
            contentEditable
            suppressContentEditableWarning
            onBlur={handleBlur}
        />

    );

}