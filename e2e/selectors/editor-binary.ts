import { dataTest } from "../helpers";

export const editorBinary = {
  lastModifiedLabel: () => cy.get(dataTest("property-sheet-3-label")),
  lastModifiedValue: () => cy.get(dataTest("property-sheet-3-value")),
  pathLabel: () => cy.get(dataTest("property-sheet-1-label")),
  pathValue: () => cy.get(dataTest("property-sheet-1-value")),
  sizeLabel: () => cy.get(dataTest("property-sheet-2-label")),
  sizeValue: () => cy.get(dataTest("property-sheet-2-value")),
  typeLabel: () => cy.get(dataTest("property-sheet-0-label")),
  typeValue: () => cy.get(dataTest("property-sheet-0-value")),
} as const;