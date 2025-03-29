import { dataTest, dataTestType } from "./data-test";

export const outline = {
  artifactOf: (node: Cypress.Chainable) => outline.childrenOf(node).filter(".p-tree-node-leaf"),
  binaryArtifactOf: (node: Cypress.Chainable) => outline.artifactOf(node).filter((_, el) => !outline.labelOfElement(el).includes(".txt")),
  childrenContainerOf: (node: Cypress.Chainable) => node.find("ul.p-tree-node-children"),
  childrenOf: (node: Cypress.Chainable) => outline.childrenContainerOf(node) .find("li.p-tree-node"),
  directoryOf: (node: Cypress.Chainable) => outline.childrenOf(node).filter(":not(.p-tree-node-leaf)"),
  inlineNodeOf: (nodeWrapper: Cypress.Chainable) =>
    nodeWrapper.find(dataTestType("outline-node")),
  labelOf: (node: Cypress.Chainable) => node.find(".p-tree-node-label").invoke("text"),
  labelOfElement: (el: HTMLElement) => Cypress.$(el).find(".p-tree-node-label").text(),
  outline: () => cy.get(dataTest("nodes-outline-tree")),
  rootNode: () => cy.get(".p-tree-root-children > .p-tree-node").first(),
  textArtifactOf: (node: Cypress.Chainable) => outline.artifactOf(node).filter((_, el) => outline.labelOfElement(el).includes(".txt")),
  toogleOf: (node: Cypress.Chainable) => node.find(".p-tree-node-toggle-button"),
} as const;