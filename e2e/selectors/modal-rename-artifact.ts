import { dataTest } from "../helpers";

export const modalRenameArtifact = {
  buttonSave: () => cy.get(dataTest("button-save")),
  inputError: () => cy.get(dataTest("input-name-error")),
  inputName: () => cy.get(dataTest("input-name-input")),
  modalError: () => cy.get(dataTest("modal-rename-error"))
} as const;