import { dashboard } from "./dashboard";

export const tagsPage = {
  ...dashboard,
  inputName,
  buttonAdd,
  listItem,
  listItemMenu,
  add,
  del,
  focus,
};

function inputName() {
  return cy.get("#input-name input");
}
function buttonAdd() {
  return cy.get("#button-add");
}

function listItem(name) {
  const strictlyText = new RegExp("^" + name + "$");
  return cy.contains(".item-name", strictlyText).parent();
}

function listItemMenu(name) {
  return listItem(name).find(".actions-menu");
}

function add(name) {
  inputName().should("not.be.disabled");
  inputName().type(name);
  return buttonAdd().click();
}

function del(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-delete").click();
}
