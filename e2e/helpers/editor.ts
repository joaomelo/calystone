import { dataTest } from "./data-test";

export const editor = {
  binary: {
    path: () => cy.get(dataTest("path")),
    size: () => cy.get(dataTest("size")),
    type: () => cy.get(dataTest("type")),
  },
  directory: {
    items: () => cy.get(dataTest("items")),
    path: () => cy.get(dataTest("path")),
  },
  empty: {
    editor: () => cy.get(dataTest("editor-empty")),
  },
  text: {
    editor: () => cy.get(dataTest("editor-text")),
  }
} as const;