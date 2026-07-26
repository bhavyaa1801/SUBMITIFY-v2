import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FloatingCode from "../components/FloatingCode";
import CursorEffect from "../components/CursorEffect";
import AppMockup from "../components/AppMockup";
import { useGuide } from "../context/GuideContext";

const FEATURES = [
  "AI Parsing",
  "Editable",
  "PDF Export",
  "Multiple Profiles",
  "Structured Sections",
  "No Login",
];


const HOW_STEPS = [
  {
    num: "01",
    title: "Project Information",
    desc:
      "Enter your subject, course, semester and other document details.",
  },
  {
    num: "02",
    title: "Parse & Review Questions",
    desc:
      "Paste your question sheet. Submitify parses individual questions, and you can review, edit or add questions before generation.",
  },
  {
    num: "03",
    title: "AI Generation",
    desc:
      "Each experiment is generated independently using parallel workers for faster and more reliable results.",
  },
  {
    num: "04",
    title: "Live Document Editor",
    desc:
      "Edit headings, paragraphs, code blocks and images before exporting your document.",
  },
  {
    num: "05",
    title: "Professional PDF Export",
    desc:
      "Export a polished, print-ready academic document powered by Playwright.",
  },
];

const FEATURE_CARDS = [
  {
    icon: "📝",
    title: "Live Document Editor",
    desc: "Edit headings, paragraphs, code blocks and images before exporting your document.",
  },
  {
    icon: "⚡",
    title: "Parallel AI Generation",
    desc: "Experiments are generated independently using a worker pool for faster and more reliable results.",
  },
  {
    icon: "🖼️",
    title: "Image Support",
    desc: "Insert screenshots anywhere in your document and resize them directly inside the editor.",
  },
  {
    icon: "📄",
    title: "Professional PDF Export",
    desc: "Export polished, print-ready academic documents powered by Playwright.",
  },
  {
    icon: "🛡️",
    title: "Reliable AI Pipeline",
    desc: "Automatic retries and intelligent parsing ensure consistent document generation.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const { openGuide } = useGuide();
  
  const SAMPLE_PDF_URL = "/SAMPLE.pdf";

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="lp-root">
      <CursorEffect />
      <FloatingCode />

      {/* HERO */}

      <section className="lp-hero">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            width: "100%",
            padding: "0 60px 0 80px",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          <div
            className="lp-hero-content"
            style={{
              flex: "0 1 460px",
              textAlign: "left",
              alignItems: "flex-start",
            }}
          >
            <div className="lp-tags">
              <span className="lp-tag">● Groq AI</span>
              <span className="lp-tag">● Go Backend</span>
              <span className="lp-tag">● React</span>
            </div>

            <h1 className="lp-headline">
              Create <span className="lp-headline-accent">Academic Documents</span>
              <br />
              with AI.
            </h1>

            <p className="lp-subtext">
              Paste your question sheet. Review parsed questions. Generate
              structured academic documents with AI. Edit everything before
              exporting to PDF.
            </p>

            <div className="lp-feature-tags">
              {FEATURES.map((feature) => (
                <span key={feature} className="lp-feature-tag">
                  {feature}
                </span>
              ))}
            </div>

            <div className="lp-hero-actions">
              <button
                className="btn-primary-lg"
                onClick={() => navigate("/create")}
              >
                Create Document
              </button>

              <button
                className="btn-ghost-lg"
                onClick={() => setShowSample(true)}
              >
                View Sample PDF
              </button>

              <button
                className="btn-ghost-lg"
                onClick={() => openGuide("features")}
              >
                Explore Features
              </button>

            </div>
          </div>

          {!isMobile && (
            <div
              style={{
                flex: "1 1 600px",
                minWidth: 0,
                maxWidth: 700,
                marginLeft: "250px",
              }}
            >
              <AppMockup />
            </div>
          )}
        </div>
      </section>
      {/* HOW IT WORKS */}

      <section className="lp-section" id="how">
        <div className="lp-section-label">// workflow</div>

        <h2 className="lp-section-title">
          Four simple steps to your document
        </h2>

        <p className="lp-section-sub">
          No manual formatting. No copy-paste. Just your questions and AI.
        </p>

        <div className="lp-steps">
          {HOW_STEPS.map((step) => (
            <div key={step.num} className="lp-step-card">
              <span
                className="lp-step-num"
                style={{ color: "#3b82f6" }}
              >
                {step.num}
              </span>

              <h3 className="lp-step-title">
                {step.title}
              </h3>

              <p className="lp-step-desc">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}

      <section className="lp-section" id="features">
        <div className="lp-section-label">// features</div>

        <h2 className="lp-section-title">
          Everything you need in one place
        </h2>

        <p className="lp-section-sub">
          Built for assignments, practicals, reports and academic documents.
        </p>

        <div className="lp-features-grid">
          {FEATURE_CARDS.map((feature) => (
            <div
              key={feature.title}
              className="lp-feature-card"
            >
              <span className="lp-feature-icon">
                {feature.icon}
              </span>

              <h3 className="lp-feature-title">
                {feature.title}
              </h3>

              <p className="lp-feature-desc">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* CTA */}

      <section className="lp-cta-banner">
        <div className="lp-cta-content">
          <div>
            <h2 className="lp-cta-title">
              Ready to build your next academic document?
            </h2>

            <p className="lp-cta-sub">
              Parse. Review. Generate. Edit. Export.
            </p>
          </div>

          <button
            className="btn-primary-lg"
            onClick={() => navigate("/create")}
          >
            Create Document
          </button>
        </div>
      </section>

      {/* SAMPLE PDF MODAL */}

      {showSample && (
        <div
          onClick={() => setShowSample(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(1100px,100%)",
              height: "min(90vh,900px)",
              background: "#14161d",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 18,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}

            <div
              style={{
                padding: "18px 22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                }}
              >
                📄 Sample Academic Document
              </div>

              <button
                className="btn-ghost"
                onClick={() => setShowSample(false)}
              >
                ✕
              </button>
            </div>

            {/* Content */}

            <div
              style={{
                flex: 1,
                overflow: "hidden",
              }}
            >
              {isMobile ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 20,
                    padding: 30,
                  }}
                >
                  <span style={{ fontSize: "3rem" }}>📄</span>

                  <h3
                    style={{
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    Sample Academic Document
                  </h3>

                  <p
                    style={{
                      color: "#8b93a7",
                      maxWidth: 320,
                      textAlign: "center",
                    }}
                  >
                    PDF preview isn't supported on mobile.
                    Open it using your device's PDF viewer.
                  </p>

                  <a
                    href={SAMPLE_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-lg"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Open Sample PDF
                  </a>
                </div>
              ) : (
                <iframe
                  src={SAMPLE_PDF_URL}
                  title="Sample PDF"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              )}
            </div>

            {/* Footer */}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                padding: 18,
                borderTop: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <a
                href={SAMPLE_PDF_URL}
                download="Submitify-Sample.pdf"
                className="btn-ghost-lg"
                style={{
                  textDecoration: "none",
                }}
              >
                Download Sample
              </a>

              <button
                className="btn-primary-lg"
                onClick={() => {
                  setShowSample(false);
                  navigate("/create");
                }}
              >
                Create Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}