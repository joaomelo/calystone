import { dataTest } from "./data-test";

export const editorText = {
  input: () => cy.get(dataTest("editor-text")),
} as const;