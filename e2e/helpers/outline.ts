import { dataTest } from "./data-test";

export const pageOutline = {
  selectors: {
    childrenOf: (node: Cypress.Chainable) => node.find("ul.p-tree-node-children").find("li.p-tree-node"),
    outline: () => cy.get(dataTest("nodes-outline-tree")),
    rootNode: () => cy.get(".p-tree-root-children > .p-tree-node").first(),
    subdirectoryOf: (node: Cypress.Chainable) => pageOutline.selectors.childrenOf(node).filter(":not(.p-tree-node-leaf)"),
    toogleOf: (node: Cypress.Chainable) => node.find(".p-tree-node-toggle-button"),
    url: () => "/in/outline"
  }
} as const;