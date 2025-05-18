import { dataTest } from "../helpers";

export const dialogCreateDirectory = {
  buttonSave: () => cy.get(dataTest("button-save")),
  inputError: () => cy.get(dataTest("input-name-error")),
  inputName: () => cy.get(dataTest("input-name-input")),
  modalError: () => cy.get(dataTest("modal-create-directory-error")),
} as const;