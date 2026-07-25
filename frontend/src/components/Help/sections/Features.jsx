import "./Features.css";

const FEATURE_GROUPS = [
  {
    title: "Document Editor",
    features: [
      {
        title: "Live Editing",
        description:
          "Edit every heading, paragraph and generated content before exporting.",
      },
      {
        title: "Rich Formatting",
        description:
          "Apply bold, italic, underline, alignment and font size directly inside the editor.",
      },
      {
        title: "Image Support",
        description:
          "Insert screenshots anywhere in your document and resize them visually.",
      },
      {
        title: "Insert Blocks",
        description:
          "Add paragraphs, code blocks and images exactly where you need them.",
      },

    ],
  },
  {
    title: "Export",
    features: [
      {
        title: "Professional PDF",
        description:
          "Export print-ready academic documents with optimized spacing and layout.",
      },
      {
        title: "Live Preview",
        description:
          "The editor closely matches the exported PDF, minimizing formatting surprises.",
      },
    ],
  },
  {
    title: "AI Generation",
    features: [
      {
        title: "AI Practical Generation",
        description:
          "Generate structured academic experiments from raw question sheets using Groq AI.",
      },
      {
        title: "Reliable Generation",
        description:
          "Automatic retry logic ensures failed generations are retried without interrupting the workflow.",
      },
    ],
  },
];

export default function Features() {
  return (
    <div className="guide-page">
      <div className="guide-page-header">
        <span className="guide-page-label">Features</span>

        <h1>Everything included in Submitify V2</h1>

        <p>
          Submitify combines AI generation, a live document editor and
          professional PDF export into a single workflow.
        </p>
      </div>

      <div className="feature-groups">
        {FEATURE_GROUPS.map((group) => (
          <section key={group.title} className="feature-group">
            <h2>{group.title}</h2>

            <div className="feature-grid">
              {group.features.map((feature) => (
                <div key={feature.title} className="feature-card">
                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}