import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FloatingCode from "../components/FloatingCode";
import CursorEffect from "../components/CursorEffect";
import AppMockup from "../components/AppMockup";

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
    desc: "Enter your subject, course, university and other metadata.",
  },
  {
    num: "02",
    title: "Paste Question Sheet",
    desc: "Paste your assignment, practical or question paper exactly as provided.",
  },
  {
    num: "03",
    title: "Review Parsed Questions",
    desc: "Edit, delete or add questions before generation.",
  },
  {
    num: "04",
    title: "Generate & Export",
    desc: "AI builds a structured academic document that you can edit and export.",
  },
];

const FEATURE_CARDS = [
  {
    icon: "🤖",
    title: "AI Question Parsing",
    desc: "Automatically extracts individual questions from messy question sheets.",
  },
  {
    icon: "✍️",
    title: "Editable Documents",
    desc: "Every generated section remains editable before exporting.",
  },
  {
    icon: "📑",
    title: "Structured Documents",
    desc: "Paragraphs, code, tables, equations and lists generated automatically.",
  },
  {
    icon: "⚡",
    title: "Powered by Groq",
    desc: "Lightning-fast AI generation using Groq inference.",
  },
  {
    icon: "📄",
    title: "One-click PDF",
    desc: "Export professional academic documents in a single click.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

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
                onClick={() => {
                  const section = document.getElementById("how");

                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
              >
                Learn More
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

      {/* PIPELINE */}

      <section className="lp-section">
        <div className="lp-section-label">// pipeline</div>

        <h2 className="lp-section-title">
          Built around an intelligent workflow
        </h2>

        <p className="lp-section-sub">
          Submitify separates parsing, generation and exporting into dedicated
          services for reliable document creation.
        </p>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: 900,
              width: "100%",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: "32px",
              fontFamily: "monospace",
              color: "#d4d4d4",
              lineHeight: 2,
              fontSize: "0.95rem",
              overflowX: "auto",
            }}
          >
{`Question Sheet
      │
      ▼
Parse
      │
      ▼
Review Questions
      │
      ▼
Generate
      │
      ▼
Document Editor
      │
      ▼
Export PDF`}
          </div>
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
    </div>
  );
}