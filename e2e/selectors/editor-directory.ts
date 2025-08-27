import { dataTest } from "../helpers";

export const editorDirectory = {
  buttonReload: () => cy.get(dataTest("button-reload-directory")),
  descriptorContent: () => cy.get(dataTest("descriptor-content")),
  descriptorTip: () => cy.get(dataTest("descriptor-tip")),
  itemsLabel: () => cy.get(dataTest("property-sheet-label-items")),
  itemsValue: () => cy.get(dataTest("property-sheet-value-items")),
  pathLabel: () => cy.get(dataTest("property-sheet-label-path")),
  pathValue: () => cy.get(dataTest("property-sheet-value-path")),
  tipUnloaded: () => cy.get(dataTest("tip-unloaded")),
} as const;