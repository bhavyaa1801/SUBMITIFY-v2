import { createContext, useContext, useState } from "react";

import LearnMoreModal from "../components/Help/LearnMoreModal";

const GuideContext = createContext();

export function GuideProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState("getting-started");

  const openGuide = (tab = "getting-started") => {
    setDefaultTab(tab);
    setIsOpen(true);
  };

  const closeGuide = () => {
    setIsOpen(false);
  };

  return (
    <GuideContext.Provider
      value={{
        openGuide,
        closeGuide,
      }}
    >
      {children}

      <LearnMoreModal
        isOpen={isOpen}
        defaultTab={defaultTab}
        onClose={closeGuide}
      />
    </GuideContext.Provider>
  );
}

export function useGuide() {
  return useContext(GuideContext);
}