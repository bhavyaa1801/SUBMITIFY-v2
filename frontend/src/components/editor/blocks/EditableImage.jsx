import "./Editpara.css";
import { useEditorMode } from "../context/EditorModeContext";


const API =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080";

export default function EditableImage({
    value,
    onChange,
    style = {},
    placeholder = "Upload Image",
}) {

    const { isPrint } = useEditorMode();

    const updateImage = async (file) => {

        if (!file) return;

        const form = new FormData();

        form.append("image", file);

        try {

            const res = await fetch(

                `${API}/upload`,

                {

                    method: "POST",

                    body: form,

                }

            );

            if (!res.ok) {

                throw new Error(
                    "Upload failed"
                );

            }

            const data = await res.json();

            onChange?.(

                `${API}${data.url}`

            );

        }

        catch (err) {

            console.error(err);

            alert(
                "Image upload failed."
            );

        }

    };

    const handleSelect = (e) => {
        if (isPrint) return;
        updateImage(
            e.target.files?.[0]
        );

    };

    const handleDrop = (e) => {

        e.preventDefault();
        if (isPrint) return;
        updateImage(
            e.dataTransfer.files?.[0]
        );

    };

    const handleDragOver = (e) => {
        if (isPrint) return;
        e.preventDefault();

    };

    return (

        <div
            className="image-block"
            onDrop={!isPrint ? handleDrop : undefined}
            onDragOver={!isPrint ? handleDragOver : undefined}
        >

            <label className="image-label">

                {

                    value ? (

                        <img
                            src={value}
                            alt="Document"
                            className="image-preview"
                            style={{
                                width: `${style.width || 350}px`,
                                height: "auto",
                                display: "block",
                                margin:
                                    style.align === "center"
                                        ? "0 auto"
                                        : style.align === "right"
                                            ? "0 0 0 auto"
                                            : "0",
                            }}
                            title={
                                isPrint
                                    ? ""
                                    : "Click to change image"
                            }
                        />

                    ) : (

                        <div className="image-placeholder">

                            <div className="image-icon">
                                🖼
                            </div>

                            <h3>

                                {placeholder}

                            </h3>

                            <p>
                                Click or drag & drop an image here
                            </p>

                        </div>

                    )

                }

                <input
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={isPrint}
                    onChange={handleSelect}
                />

            </label>

        </div>

    );

}