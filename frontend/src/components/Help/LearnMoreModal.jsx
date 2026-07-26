import { useEffect, useState } from "react";
import "./LearnMoreModal.css";

import GettingStarted from "./sections/GettingStarted";
import Features from "./sections/Features";
import WhatsNew from "./sections/WhatsNew";
import FAQ from "./sections/FAQ";

const tabs = [
  {
    id: "getting-started",
    label: "Getting Started",
  },
  {
    id: "features",
    label: "Features",
  },
  {
    id: "whats-new",
    label: "What's New",
  },
  {
    id: "faq",
    label: "FAQ",
  },
];

export default function LearnMoreModal({ isOpen, onClose ,defaultTab = "getting-started",}) {
  const [activeTab, setActiveTab] = useState("getting-started");

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen,defaultTab]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "getting-started":
        return <GettingStarted />;

      case "features":
        return <Features />;

      case "whats-new":
        return <WhatsNew />;

      case "faq":
        return <FAQ />;

      default:
        return <GettingStarted />;
    }
  };

  return (
    <div className="learn-more-overlay" onClick={onClose}>
      <div
        className="learn-more-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="learn-more-header">
          <div>
            <h2>Submitify V2 User Guide</h2>
            <p>Everything you need to know about Submitify.</p>
          </div>

          <button
            className="learn-more-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="learn-more-body">
          <aside className="learn-more-sidebar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`sidebar-tab ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </aside>

          <main className="learn-more-content">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}