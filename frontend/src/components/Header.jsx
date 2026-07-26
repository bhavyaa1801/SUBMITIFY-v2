import { useNavigate, useLocation } from "react-router-dom";
import { useGuide } from "../context/GuideContext";

const NAV_LINKS = [
  { label: "How it works", href: "/#how" },
  { label: "Features", href: "/#features" },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openGuide } = useGuide();

  const isCreatePage = location.pathname === "/create";

  return (
    <header className="header-root">
      {/* Logo */}
      <div className="header-left">
        <div className="lp-logo" onClick={() => navigate("/")}>
          <span className="lp-logo-icon">📄</span>
          <span className="lp-logo-text">SUBMITIFY</span>
        </div>

        {!isCreatePage && (
          <nav className="header-nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="header-nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Right */}
      <div className="header-right">
        {isCreatePage ? (
          <button
            className="btn-ghost header-back"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        ) : (
          <button
            className="btn-primary btn-whats-new "
            onClick={() => openGuide("whats-new")}
          >
            <span className="whats-new-dot"></span>
             <span>What's New</span>
          </button>
        )}
      </div>
    </header>
  );
}