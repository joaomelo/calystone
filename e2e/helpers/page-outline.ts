import { dataTest } from "./data-test";

export const pageOutline = {
  selectors: {
    editors: {
      binary: {
        path: () => cy.get(dataTest("path")),
        size: () => cy.get(dataTest("size")),
        type: () => cy.get(dataTest("type")),
      },
      directory: {
        items: () => cy.get(dataTest("items")),
        path: () => cy.get(dataTest("path")),
      },
      text: {
        editor: () => cy.get(dataTest("editor-text")),
      }
    },
    url: () => "/outline"
  }
} as const;