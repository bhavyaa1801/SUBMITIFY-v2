import "./GuideModal.css";

export default function GuideModal({
    open,
    onClose,
    onLearnMore,
}) {

    if (!open) return null;

    return (

        <div className="guide-overlay">

            <div className="guide-modal">

                <div className="guide-modal-header">

                    <div>

                        <h2> Welcome to the NEW Submitify Editor</h2>

                        <p>
                            Review and customize your practical file before exporting.
                        </p>

                    </div>

                    <button
                        className="guide-close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="guide-section">

                    <h3> 🫡 Quick Start</h3>

                    <ul>

                        <li>✅ Click any text to edit its content</li>

                        <li>✅ Hover between sections to insert new content</li>

                        <li>✅ Add paragraphs, code blocks, and images</li>

                        <li>✅ Resize images using the editor toolbar</li>

                        <li>✅ Export your document as a professional PDF</li>

                    </ul>

                </div>

                <div className="guide-section">

                    <h3>📄 PDF Notes</h3>

                    <p>

                        Your exported PDF will closely match what you see in
                        the editor.

                    </p>

                    <p>

                        Minor spacing, alignment, page breaks, and print
                        formatting are automatically optimized during PDF export.

                    </p>

                </div>

                <div className="guide-section">

                    <h3>💡 Pro Tip</h3>

                    <p>

                        AI-generated content is a starting point.

                    </p>

                    <p>

                        Feel free to improve explanations, add screenshots,
                        observations, and diagrams before exporting your final
                        practical file.

                    </p>

                </div>

                <div className="guide-footer">

                    <button
                        className="guide-secondary-btn"
                        onClick={onLearnMore}
                    >
                        Learn More
                    </button>

                    <button
                        className="guide-primary-btn"
                        onClick={onClose}
                    >
                        Got it!
                    </button>

                </div>

            </div>

        </div>

    );

}