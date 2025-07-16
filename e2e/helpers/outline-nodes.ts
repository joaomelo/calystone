import {
  dataTest, dataTestType
} from "./data-test";

export const outlineNodes = {
  artifactBinaryOf: (node: Cypress.Chainable) => outlineNodes.artifactOf(node).filter((_, el) => !outlineNodes.labelOfElement(el).includes(".txt") && !outlineNodes.labelOfElement(el).includes(".todo")),
  artifactOf: (node: Cypress.Chainable) => outlineNodes.childrenOf(node).filter(".p-tree-node-leaf"),
  artifactTextOf: (node: Cypress.Chainable) => outlineNodes.artifactOf(node).filter((_, el) => outlineNodes.labelOfElement(el).includes(".txt")),
  artifactTodoOf: (node: Cypress.Chainable) => outlineNodes.artifactOf(node).filter((_, el) => outlineNodes.labelOfElement(el).includes(".todo")),
  childrenContainerOf: (node: Cypress.Chainable) => node.find("ul.p-tree-node-children"),
  childrenOf: (node: Cypress.Chainable) => outlineNodes.childrenContainerOf(node).find("li.p-tree-node"),
  directoryOf: (node: Cypress.Chainable) => outlineNodes.childrenOf(node).filter(":not(.p-tree-node-leaf)"),
  inlineNodeOf: (nodeWrapper: Cypress.Chainable) =>
    nodeWrapper.find(dataTestType("outline-item")),
  labelOf: (node: Cypress.Chainable) => node.find(".p-tree-node-label").first().invoke("text"),
  labelOfElement: (el: HTMLElement) => Cypress.$(el).find(".p-tree-node-label").text(),
  nodeLabeledAs: (label: string) => {
    return cy.get(`.p-tree-node[aria-label='${label}']`);
  },
  outline: () => cy.get(dataTest("nodes-outline-tree")),
  rootNode: () => cy.get(".p-tree-root-children > .p-tree-node"),
  rootNodeContent: () => cy.get(".p-tree-root-children > .p-tree-node > .p-tree-node-content").first(),
  toogleOf: (node: Cypress.Chainable) => node.find(".p-tree-node-toggle-button")
} as const;