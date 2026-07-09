import { useNavigate } from "react-router-dom";

const FOOTER_COLS = [
  {
    heading: "DOCS",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Features", href: "/#features" },
    ],
  },
  {
    heading: "CONNECT",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/bhavyarajput/?skipRedirect=true",
        external: true,
      },
      {
        label: "Report a bug",
        href: "https://forms.gle/C7aKtZbgXKRXykX88",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer-root">
      {/* Brand */}
      <div className="footer-brand">
        <div className="lp-logo" onClick={() => navigate("/")}>
          <span className="lp-logo-icon">📄</span>
          <span className="lp-logo-text">SUBMITIFY</span>
        </div>

        <p className="footer-tagline">
          AI-powered academic document engine built for students.
          <br />
          Generate structured, editable academic documents in minutes.
          <br />
          Powered by Groq AI, Go, React, and PostgreSQL.
        </p>
      </div>

      {/* Link Columns */}
      {FOOTER_COLS.map((col) => (
        <div key={col.heading} className="footer-col">
          <span className="footer-col-heading">{col.heading}</span>

          {col.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="footer-link"
              {...(link.external
                ? {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
      ))}

      {/* Bottom */}
      <div className="footer-bottom">
        <span className="footer-copy">
          © {new Date().getFullYear()} Submitify. Built for students.
        </span>

        <span className="footer-mono">
          Powered by <span className="footer-groq">Groq AI</span>
        </span>
      </div>
    </footer>
  );
}