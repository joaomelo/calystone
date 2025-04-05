import { dataTest } from "./data-test";

export const editorEmpty = {
  message: () => cy.get(dataTest("editor-empty")),
} as const;