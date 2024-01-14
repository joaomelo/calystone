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
  return cy.get("select").select(tagsNames);
}

function buttonSave() {
  return cy.get("#button-save");
}

function buttonCancel() {
  return cy.get("#button-cancel");
}
