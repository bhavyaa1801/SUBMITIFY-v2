import "./FAQ.css";

const FAQS = [
  {
    question: "Can I edit AI-generated content?",
    answer:
      "Yes. Every heading, paragraph, code block and image remains fully editable before exporting your document.",
  },
  {
    question: "Will exporting regenerate my document?",
    answer:
      "No. Exporting simply converts your current document into a PDF. No additional AI generation takes place.",
  },
  {
    question: "Can I insert screenshots?",
    answer:
      "Yes. Images can be inserted anywhere in the document and resized directly inside the editor.",
  },
  {
    question: "Why does the PDF look slightly different from the editor?",
    answer:
      "The editor is optimized for editing, while the exported PDF uses browser print rendering to produce a clean, print-ready layout.",
  },
  {
    question: "How are multiple experiments generated?",
    answer:
      "Submitify generates experiments independently using a parallel worker pool, making large practical files significantly faster to generate.",
  },
  {
    question: "What happens if AI generation fails?",
    answer:
      "Submitify automatically retries failed generations before reporting an error, improving reliability for larger documents.",
  },
  {
    question: "Does Submitify save my documents?",
    answer:
      "Not yet. Documents are currently generated in your browser. Draft saving is planned for a future release.",
  },
];

export default function FAQ() {
  return (
    <div className="guide-page">
      <div className="guide-page-header">
        <span className="guide-page-label">FAQ</span>

        <h1>Frequently Asked Questions</h1>

        <p>
          Answers to the most common questions about Submitify V2.
        </p>
      </div>

      <div className="faq-list">
        {FAQS.map((item) => (
          <div className="faq-card" key={item.question}>
            <h3>{item.question}</h3>

            <p>{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="guide-tip">
        <h4>Need more help?</h4>

        <p>
          If you encounter a bug or have a feature request, use the Report a Bug
          link available in the footer of the landing page.
        </p>
      </div>
    </div>
  );
}