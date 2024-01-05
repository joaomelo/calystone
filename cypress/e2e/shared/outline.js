import { dashboard } from "./dashboard";

export const outlinePage = {
  ...dashboard,
  inputName,
  buttonAdd,
  listItem,
  listItemDates,
  listItemMenu,
  listItemChildOf,
  listItemCompletedTag,
  listItemCancelledTag,
  crumb,
  add,
  edit,
  focus,
  activate,
  complete,
  cancel,
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
  return cy.contains(".item-name", strictlyText).parent();
}

function listItemMenu(name) {
  return listItem(name).find(".actions-menu");
}

function listItemDates(name) {
  return listItem(name).find(".item-dates");
}

function listItemCompletedTag(name) {
  return listItem(name).find(".completed");
}

function listItemCancelledTag(name) {
  return listItem(name).find(".cancelled");
}

function listItemChildOf(name) {
  return listItem(name)
    .parents(".list-tree-root")
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
  return listItemMenu(name).find(".menu-focus").click();
}

function complete(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-complete").click();
}

function cancel(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-cancel").click();
}

function activate(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-activate").click();
}

function appendUnder(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-append").click();
}

function edit(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-edit").click();
}
