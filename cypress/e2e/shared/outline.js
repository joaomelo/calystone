import { dashboard } from "./dashboard";

export const outlinePage = {
  ...dashboard,
  inputName,
  buttonAdd,
  listItem,
  listItemMenu,
  listItemChildOf,
  crumb,
  add,
  edit,
  focus,
  appendUnder,
};

function inputName() {
  return cy.get("#input-name input");
}
function buttonAdd() {
  return cy.get("#button-add");
}

function listItem(name) {
  const strictlyText = new RegExp("^" + name + "$");
  return cy.contains(".list-item", strictlyText);
}

function listItemMenu(name) {
  return listItem(name).siblings(".actions-menu");
}

function listItemChildOf(name) {
  return listItem(name)
    .parents(".list-root-wrapper")
    .siblings(".list-tree-children")
    .find(".list-item");
}

function crumb(text) {
  return cy.contains(".crumbs-base", text);
}

function add(name) {
  inputName().should("not.be.disabled");
  inputName().type(name);
  return buttonAdd().click();
}

function focus(name) {
  listItemMenu(name).click();
  return cy.get(".focus").click();
}

function appendUnder(name) {
  listItemMenu(name).click();
  return cy.get(".append").click();
}

function edit(name) {
  listItemMenu(name).click();
  return cy.get(".edit").click();
}
