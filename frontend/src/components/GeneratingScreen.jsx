import { useEffect, useState } from "react";

const GEN_STEPS = [
  "Analyzing parsed questions...",
  "Generating academic content using AI...",
  "Building document model...",
  "Preparing document editor...",
  "Finalizing document...",
];

export default function GeneratingScreen() {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setVisibleSteps(i);

      if (i >= GEN_STEPS.length) {
        clearInterval(interval);
      }
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gen-screen">
      <div className="gen-code-bg" />

      <div className="gen-card">

        <div className="gen-spinner" />

        <h2 className="gen-title">
          Generating your document...
        </h2>

        <p className="gen-sub">
          AI is generating content while Submitify builds your editable document.
        </p>

        <div className="gen-log">
          {GEN_STEPS.slice(0, visibleSteps).map((step, index) => (
            <div
              key={index}
              className="gen-log-line"
            >
              <span className="gen-arrow">→</span>

              <span className="gen-step">
                {step}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}