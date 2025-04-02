import { dataTest } from "./data-test";

export const toolbarNode = {
  buttonCreateDirectory: () => cy.get(dataTest("button-create-directory")),
  buttonRemove: () => cy.get(dataTest("button-remove")),
  buttonRename: () => cy.get(dataTest("button-rename")),
} as const;