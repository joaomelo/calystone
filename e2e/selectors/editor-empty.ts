import { dataTest } from "../helpers";

export const editorEmpty = { message: () => cy.get(dataTest("editor-empty")), } as const;