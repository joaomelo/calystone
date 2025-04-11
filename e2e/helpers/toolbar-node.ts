import { dataTest } from "./data-test";

export const toolbarNode = {
  buttonCreateArtifact: () => cy.get(dataTest("button-create-artifact")),
  buttonCreateDirectory: () => cy.get(dataTest("button-create-directory")),
  buttonOpenDirectory: () => cy.get(dataTest("button-open-directory")),
  buttonRemove: () => cy.get(dataTest("button-remove")),
  buttonRename: () => cy.get(dataTest("button-rename")),
  buttonShare: () => cy.get(dataTest("button-share")),
} as const;