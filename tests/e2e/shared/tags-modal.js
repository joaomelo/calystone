import { dt } from "./data-test";

export const tagsModal = {
  buttonCancel,
  buttonSave,
  link,
  select,
};

function link(tagsNames) {
  select(tagsNames);
  buttonSave().click();
}

function select(tagsNames) {
  return cy.get(dt("modal-tags-show")).find("select").select(tagsNames);
}

function buttonSave() {
  return cy.get(dt("modal-tags-show")).find(dt("button-save"));
}

function buttonCancel() {
  return cy.get(dt("modal-tags-show")).find(dt("button-cancel"));
}
