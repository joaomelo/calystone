import { dashboard } from "./dashboard";

export const tagsPage = {
  ...dashboard,
  add,
  buttonAdd,
  del,
  focus,
  inputName,
  itemMenu,
  listItem,
  menuDelete,
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

function itemMenu(name) {
  return listItem(name).find(".actions-menu");
}

function menuDelete(name) {
  return itemMenu(name).find(".menu-delete");
}

function add(name) {
  inputName().should("not.be.disabled");
  inputName().type(name);
  return buttonAdd().click();
}

function del(name) {
  itemMenu(name).click();
  return menuDelete(name).click();
}
