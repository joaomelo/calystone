import { dashboard } from "./dashboard";

export const outlinePage = {
  ...dashboard,
  inputName,
  buttonAdd,
  listItem,
  listItemMenu,
  crumb,
  add,
  focus,
};

function inputName() {
  return cy.get("#input-name input");
}
function buttonAdd() {
  return cy.get("#button-add");
}
function listItem(name) {
  return cy.contains(".list-root-wrapper", name);
}
function listItemMenu(name) {
  return listItem(name).find(".button-base");
}
function crumb(text) {
  return cy.contains(".crumbs-base", text);
}

function add(name) {
  inputName().type(name);
  return buttonAdd().click();
}

function focus(name) {
  listItemMenu(name).click();
  return cy.get(".focus").click();
}
