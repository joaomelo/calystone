import { dataTest } from "./data-test";

export const editor = {
  empty: {
    editor: () => cy.get(dataTest("editor-empty")),
  },
  text: {
    editor: () => cy.get(dataTest("editor-text")),
  }
} as const;