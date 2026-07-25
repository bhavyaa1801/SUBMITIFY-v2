import "./WhatsNew.css";

const RELEASES = [
  {
    badge: "NEW",
    title: "Live Document Editor",
    description:
      "Edit every heading, paragraph, code block and image before exporting your document.",
  },
  {
    badge: "IMPROVED",
    title: "Professional PDF Export",
    description:
      "Beautiful PDF rendering powered by Playwright with improved spacing, borders and print layout.",
  },
  {
    badge: "NEW",
    title: "Parallel AI Generation",
    description:
      "Experiments are generated simultaneously using a worker pool for much faster document generation.",
  },
  {
    badge: "NEW",
    title: "Image Support",
    description:
      "Insert screenshots anywhere in the document and resize them directly inside the editor.",
  },
  {
    badge: "IMPROVED",
    title: "Better AI Reliability",
    description:
      "Automatic retries, generation metrics and improved stability during document generation.",
  },
];

const UPCOMING = [
  "Save Drafts",
  "Analytics Dashboard",
];

export default function WhatsNew() {
  return (
    <div className="guide-page">
      <div className="guide-page-header">
        <span className="guide-page-label">What's New</span>

        <h1>See what's new in Submitify V2</h1>

        <p>
          Submitify V2 introduces a completely redesigned document generation
          workflow focused on editing, performance and reliability.
        </p>
      </div>

      <section className="release-section">
        <div className="release-version">
          <div>
            <h2>Version 2.0</h2>
            <span>Current Release</span>
          </div>
        </div>

        <div className="release-list">
          {RELEASES.map((item) => (
            <div className="release-card" key={item.title}>
              <span className={`release-badge ${item.badge.toLowerCase()}`}>
                {item.badge}
              </span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="upcoming-section">
        <h2>Coming in Version 2.1</h2>

        <div className="upcoming-grid">
          {UPCOMING.map((feature) => (
            <div key={feature} className="upcoming-item">
              {feature}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}