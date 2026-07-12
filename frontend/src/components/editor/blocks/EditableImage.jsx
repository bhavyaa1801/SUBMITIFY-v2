import "./Editpara.css";

export default function EditableImage({
    value,
    onChange,
    style = {},
}) {

    const updateImage = (file) => {

        if (!file) return;

        const url = URL.createObjectURL(file);

        onChange?.(url);

    };

    const handleSelect = (e) => {

        updateImage(e.target.files?.[0]);

    };

    const handleDrop = (e) => {

        e.preventDefault();

        updateImage(e.dataTransfer.files?.[0]);

    };

    const handleDragOver = (e) => {

        e.preventDefault();

    };

    return (

        <div
            className="image-block"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
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
                            title="Click to change image"
                        />

                    ) : (

                        <div className="image-placeholder">

                            <div className="image-icon">
                                🖼
                            </div>

                            <h3>Upload Image</h3>

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
                    onChange={handleSelect}
                />

            </label>

        </div>

    );

}