import "./ExportProgress.css";
import { useEffect, useState } from "react";

const STEPS = [
    "Preparing document...",
    "Launching PDF renderer...",
    "Rendering pages...",
    "Generating PDF...",
    "Downloading PDF..."
];

export default function ExportProgress({ open }) {

    const [step, setStep] = useState(0);

    useEffect(() => {

        if (!open) {
            setStep(0);
            return;
        }

        const timer = setInterval(() => {

            setStep(prev =>
                prev < STEPS.length - 1
                    ? prev + 1
                    : prev
            );

        }, 1800);

        return () => clearInterval(timer);

    }, [open]);

    if (!open) return null;

    return (

        <div className="export-overlay">

            <div className="export-card">

                <div className="spinner" />

                <h2>Exporting PDF</h2>

                <p className="current-step">

                    {STEPS[step]}

                </p>

                <div className="step-list">

                    {STEPS.map((text, index) => (

                        <div
                            key={text}
                            className="step"
                        >

                            {index < step && "✅"}

                            {index === step && "⏳"}

                            {index > step && "⚪"}

                            <span>{text}</span>

                        </div>

                    ))}

                </div>

                <small>

                    This usually takes 30–40 seconds.
                    <br />
                    Please don't close this tab.

                </small>

            </div>

        </div>

    );

}