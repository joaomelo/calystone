import { dashboard } from "./dashboard";

export const editPage = {
  ...dashboard,
  buttonSave,
  inputEnd,
  inputName,
  inputNotes,
  inputStart,
};

function inputName() {
  return cy.get("#input-name-input");
}

function inputNotes() {
  return cy.get("#input-notes-input");
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
