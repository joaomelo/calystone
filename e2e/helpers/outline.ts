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

    tree: {
      artifactOf: (node: Cypress.Chainable) => pageOutline
        .selectors.tree.childrenOf(node)
        .filter(".p-tree-node-leaf"),
      binaryArtifactOf: (node: Cypress.Chainable) => pageOutline
        .selectors.tree.artifactOf(node)
        .filter((_, el) => !pageOutline.selectors.tree.labelOf(el).includes(".txt")),
      childrenOf: (node: Cypress.Chainable) => node
        .find("ul.p-tree-node-children")
        .find("li.p-tree-node"),
      directoryOf: (node: Cypress.Chainable) => pageOutline
        .selectors.tree.childrenOf(node)
        .filter(":not(.p-tree-node-leaf)"),
      labelOf: (el: HTMLElement) => Cypress.$(el).find(".p-tree-node-label").text(),
      outline: () => cy.get(dataTest("nodes-outline-tree")),
      rootNode: () => cy.get(".p-tree-root-children > .p-tree-node").first(),
      textArtifactOf: (node: Cypress.Chainable) => pageOutline
        .selectors.tree.artifactOf(node)
        .filter((_, el) => pageOutline.selectors.tree.labelOf(el).includes(".txt")),
      toogleOf: (node: Cypress.Chainable) => node.find(".p-tree-node-toggle-button"),
    },
    url: () => "/in/outline"
  }
} as const;