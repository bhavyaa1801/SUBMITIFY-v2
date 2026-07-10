import { createContext, useContext } from "react";

const DocumentContext = createContext(null);

export function DocumentProvider({
    document,
    setDocument,
    children,
}) {

    const updateMetadata = (key, value) => {
        setDocument(prev => ({
            ...prev,
            metadata: {
                ...prev.metadata,
                [key]: value,
            },
        }));
    };

    const updateExperiment = (experimentIndex, updates) => {
        setDocument(prev => ({
            ...prev,
            experiments: prev.experiments.map((exp, index) =>
                index === experimentIndex
                    ? { ...exp, ...updates }
                    : exp
            ),
        }));
    };

    const updateExperimentField = (experimentIndex, field, value) => {
        setDocument(prev => ({
            ...prev,
            experiments: prev.experiments.map((exp, index) =>
                index === experimentIndex
                    ? {
                        ...exp,
                        [field]: value,
                    }
                    : exp
            ),
        }));
    };

    const updateSection = (
        experimentIndex,
        sectionIndex,
        updates
    ) => {
        setDocument(prev => ({
            ...prev,
            experiments: prev.experiments.map((exp, expIndex) => {
                if (expIndex !== experimentIndex) return exp;

                return {
                    ...exp,
                    sections: exp.sections.map((section, secIndex) =>
                        secIndex === sectionIndex
                            ? {
                                ...section,
                                ...updates,
                            }
                            : section
                    ),
                };
            }),
        }));
    };

    const insertSection = (
        experimentIndex,
        afterSectionIndex,
        newSection
    ) => {

        setDocument(prev => ({

            ...prev,

            experiments: prev.experiments.map((exp, expIndex) => {

                if (expIndex !== experimentIndex)
                    return exp;

                const sections = [...exp.sections];

                sections.splice(
                    afterSectionIndex + 1,
                    0,
                    newSection
                );

                return {

                    ...exp,

                    sections,

                };

            }),

        }));

    };

    return (
        <DocumentContext.Provider
            value={{
                document,

                updateMetadata,
                updateExperiment,
                updateExperimentField,
                updateSection,
                insertSection,
            }}
        >
            {children}
        </DocumentContext.Provider>
    );
}

export function useDocument() {
    return useContext(DocumentContext);
}