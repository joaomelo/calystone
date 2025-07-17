import { dataTest } from "./data-test";

export const editorDirectory = {
  buttonReload: () => cy.get(dataTest("button-reload-directory")),
  descriptorContent: () => cy.get(dataTest("descriptor-content")),
  descriptorTip: () => cy.get(dataTest("descriptor-tip")),
  itemsLabel: () => cy.get(dataTest("property-sheet-1-label")),
  itemsValue: () => cy.get(dataTest("property-sheet-1-value")),
  pathLabel: () => cy.get(dataTest("property-sheet-0-label")),
  pathValue: () => cy.get(dataTest("property-sheet-0-value")),
  tipUnloaded: () => cy.get(dataTest("tip-unloaded")),
} as const;