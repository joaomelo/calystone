import { dataTest } from "../helpers";

export const modalRemove = {
  buttonCancel: () => cy.get(dataTest("modal-remove-cancel")),
  buttonConfirm: () => cy.get(dataTest("modal-remove-confirm")),
} as const;