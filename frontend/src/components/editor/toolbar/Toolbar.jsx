import "./Toolbar.css";
import { useDocument } from "../context/DocumentContext";

export default function Toolbar({
    onBack,
    onExport,
}) {

    const { document } = useDocument();

    return (

        <div className="editor-toolbar">

            <div className="toolbar-left">

                <button
                    className="toolbar-btn"
                    onClick={onBack}
                >
                    ← Back
                </button>

            </div>

            <div className="toolbar-center">

                <h2>
                    Submitify Document Editor
                </h2>

            </div>

            <div className="toolbar-right">

                <button
                    className="toolbar-export"
                    onClick={() => onExport(document)}
                >
                    Export PDF
                </button>

            </div>

        </div>

    );

}