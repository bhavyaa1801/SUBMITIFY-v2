import { useEffect, useRef, useState } from "react";
import "./InsertBlockButton.css";

export default function InsertBlockButton({
    onInsertParagraph,
    onInsertCode,
    onInsertImage,
}) {

    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const ref = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                ref.current &&
                !ref.current.contains(event.target)
            ) {
                setOpen(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    return (

        <div
            className="insert-block"
            ref={ref}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
                if (!open) { setHover(false); }
            }}
        >

            <div
                className={`insert-wrapper ${hover || open ? "visible" : ""}`}
            >
                <div className="line" />
                <button
                    className={`plus-button ${open ? "open" : ""}`}
                    onClick={() => {
                        setOpen(!open);
                        setHover(true);

                    }}
                >
                    +
                </button>

                <div className="line" />

            </div>

            {open && (

                <div className="insert-popup">

                    <button
                        onClick={() => {
                            onInsertParagraph();
                            setOpen(false);
                        }}
                    >
                        📄 Add Text
                    </button>

                    <button
                        onClick={() => {
                            onInsertCode();
                            setOpen(false);
                        }}
                    >
                        💻 Add Code
                    </button>

                    <button
                        onClick={() => {
                            onInsertImage();
                            setOpen(false);
                        }}
                    >
                        🖼️ Add Image
                    </button>

                </div>

            )}

        </div>

    );

}