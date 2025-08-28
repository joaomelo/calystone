import {
  dataTest,
  dataTestType
} from "../helpers";

export const outlineNodesLegacy = {
  artifactBinaryOf: (node: Cypress.Chainable) => outlineNodesLegacy.artifactOf(node).filter((_, el) => !outlineNodesLegacy.labelOfElement(el).includes(".txt") && !outlineNodesLegacy.labelOfElement(el).includes(".todo")),
  artifactOf: (node: Cypress.Chainable) => outlineNodesLegacy.childrenOf(node).filter(".p-tree-node-leaf"),
  artifactTextOf: (node: Cypress.Chainable) => outlineNodesLegacy.artifactOf(node).filter((_, el) => outlineNodesLegacy.labelOfElement(el).includes(".txt")),
  artifactTodoOf: (node: Cypress.Chainable) => outlineNodesLegacy.artifactOf(node).filter((_, el) => outlineNodesLegacy.labelOfElement(el).includes(".todo")),
  childrenContainerOf: (node: Cypress.Chainable) => node.find("ul.p-tree-node-children"),
  childrenOf: (node: Cypress.Chainable) => outlineNodesLegacy.childrenContainerOf(node).find("li.p-tree-node"),
  directoryOf: (node: Cypress.Chainable) => outlineNodesLegacy.childrenOf(node).filter(":not(.p-tree-node-leaf)"),
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

const nodeTree = "li.p-tree-node";
const nodeTreeWithLabel = (label: string) => `li.p-tree-node[aria-label='${label}']`;
const nodeChildren = "ul.p-tree-node-children";
const nodeInline = ".p-tree-node-label";
const nodeToogle = "button.p-tree-node-toggle-button";
const rootTree = `ul.p-tree-root-children > ${nodeTree}`;
const directoryTree = `${nodeTree}:not(.p-tree-node-leaf)`;
const artifactTree = `${nodeTree}.p-tree-node-leaf`;
const nodeLabel = (label: string) => dataTest(`outline-item-label-${label}`);

export const outlineNodes = {
  artifactTree,
  directoryTree,
  nodeChildren,
  nodeInline,
  nodeLabel,
  nodeToogle,
  nodeTree,
  nodeTreeWithLabel,
  rootTree
} as const;
