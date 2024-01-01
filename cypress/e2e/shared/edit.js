import { dashboard } from "./dashboard";

export const editPage = {
  ...dashboard,
  inputName,
  inputStart,
  inputEnd,
  buttonSave,
};

function inputName() {
  return cy.get("#input-name-input");
}

function inputStart() {
  return cy.get("#input-start-input");
}

function inputEnd() {
  return cy.get("#input-end-input");
}

function buttonSave() {
  return cy.get("#button-save");
}
