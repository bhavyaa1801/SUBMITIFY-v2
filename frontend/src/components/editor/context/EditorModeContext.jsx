import { createContext, useContext } from "react";

const EditorModeContext = createContext({

    mode: "edit",

    isEdit: true,

    isPrint: false,

});

export function EditorModeProvider({

    mode = "edit",

    children,

}) {

    return (

        <EditorModeContext.Provider
            value={{

                mode,

                isEdit: mode === "edit",

                isPrint: mode === "print",

            }}
        >

            {children}

        </EditorModeContext.Provider>

    );

}

export function useEditorMode() {

    return useContext(EditorModeContext);

}