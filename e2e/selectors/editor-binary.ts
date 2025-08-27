import { dataTest } from "../helpers";

export const editorBinary = {
  lastModifiedLabel: () => cy.get(dataTest("property-sheet-label-last-modified")),
  lastModifiedValue: () => cy.get(dataTest("property-sheet-value-last-modified")),
  pathLabel: () => cy.get(dataTest("property-sheet-label-path")),
  pathValue: () => cy.get(dataTest("property-sheet-value-path")),
  sizeLabel: () => cy.get(dataTest("property-sheet-label-size")),
  sizeValue: () => cy.get(dataTest("property-sheet-value-size")),
  typeLabel: () => cy.get(dataTest("property-sheet-label-type")),
  typeValue: () => cy.get(dataTest("property-sheet-value-type")),
} as const;