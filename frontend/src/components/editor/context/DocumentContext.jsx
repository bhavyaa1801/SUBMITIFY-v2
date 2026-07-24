import { createContext, useContext, useState } from "react";

const DocumentContext = createContext(null);

export function DocumentProvider({

    document,
    setDocument,
    children,
}) {

    const [activeSection, setActiveSection] = useState(null);

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

    const deleteSection = (
        experimentIndex,
        sectionIndex
    ) => {
        setDocument(prev => ({
            ...prev,
            experiments: prev.experiments.map((exp, expIndex) => {
                if (expIndex !== experimentIndex)
                    return exp;
                return {
                    ...exp,
                    sections: exp.sections.filter(
                        (_, index) => index !== sectionIndex
                    ),
                };
            }),
        }));
        setActiveSection(null);
    };

    const duplicateSection = (
        experimentIndex,
        sectionIndex
    ) => {

        setDocument(prev => ({

            ...prev,

            experiments: prev.experiments.map((exp, expIndex) => {

                if (expIndex !== experimentIndex)
                    return exp;

                const sections = [...exp.sections];

                const copy = structuredClone(
                    sections[sectionIndex]
                );

                sections.splice(
                    sectionIndex + 1,
                    0,
                    copy
                );

                return {

                    ...exp,

                    sections,

                };

            }),

        }));

    };

    const moveSectionUp = (
        experimentIndex,
        sectionIndex
    ) => {

        if (sectionIndex === 0)
            return;

        setDocument(prev => ({

            ...prev,

            experiments: prev.experiments.map((exp, expIndex) => {

                if (expIndex !== experimentIndex)
                    return exp;

                const sections = [...exp.sections];

                [
                    sections[sectionIndex - 1],
                    sections[sectionIndex]
                ] = [
                        sections[sectionIndex],
                        sections[sectionIndex - 1]
                    ];

                return {

                    ...exp,

                    sections,

                };

            }),

        }));

    };

    const moveSectionDown = (
        experimentIndex,
        sectionIndex
    ) => {

        setDocument(prev => ({

            ...prev,

            experiments: prev.experiments.map((exp, expIndex) => {

                if (expIndex !== experimentIndex)
                    return exp;

                if (
                    sectionIndex ===
                    exp.sections.length - 1
                )
                    return exp;

                const sections = [...exp.sections];

                [
                    sections[sectionIndex],
                    sections[sectionIndex + 1]
                ] = [
                        sections[sectionIndex + 1],
                        sections[sectionIndex]
                    ];

                return {

                    ...exp,

                    sections,

                };

            }),

        }));

    };

    const updateSectionStyle = (

        experimentIndex,

        sectionIndex,

        target,

        updates,

    ) => {

        setDocument(prev => ({

            ...prev,

            experiments: prev.experiments.map((exp, expIndex) => {

                if (expIndex !== experimentIndex)
                    return exp;

                return {

                    ...exp,

                    sections: exp.sections.map((section, secIndex) => {

                        if (secIndex !== sectionIndex)
                            return section;

                        return {

                            ...section,

                            style: {

                                ...section.style,

                                [target]: {

                                    ...(section.style?.[target] || {}),

                                    ...updates,

                                },

                            },

                        };

                    }),

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

                deleteSection,
                duplicateSection,
                moveSectionUp,
                moveSectionDown,

                activeSection,
                setActiveSection,
                updateSectionStyle,
            }}
        >
            {children}
        </DocumentContext.Provider>
    );
}

export function useDocument() {
    return useContext(DocumentContext);
}