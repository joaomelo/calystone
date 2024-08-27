import { dashboard } from "./dashboard";
import { dt } from "./data-test";

export const tagsPage = {
  ...dashboard,
  add,
  artifacts,
  buttonAdd,
  del,
  focus,
  inputName,
  listItem,
  listItemMenuArtifacts,
  listItemMenuDelete,
};

function add(name) {
  inputName().should("not.be.disabled");
  inputName().type(name);
  return buttonAdd().click();
}

function del(name) {
  listItemMenu(name).click();
  return listItemMenuDelete(name).click();
}

function artifacts(name) {
  listItemMenu(name).click();
  return listItemMenuArtifacts(name).click();
}

function inputName() {
  return cy.get("#input-name input");
}

function buttonAdd() {
  return cy.get("#button-add");
}

function listItem(name) {
  return cy.get(dt(`tag-${name}`)).parent();
}

function listItemMenu(name) {
  return listItem(name).find(dt("actions"));
}

function listItemMenuDelete(name) {
  return listItemMenu(name).find(dt("delete"));
}

function listItemMenuArtifacts(name) {
  return listItemMenu(name).find(dt("artifacts"));
}
