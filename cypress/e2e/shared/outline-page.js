import { dashboard } from "./dashboard";
import { dt } from "./data-test";

export const outlinePage = {
  ...dashboard,
  add,
  buttonAdd,
  crumb,
  detailsTag,
  inputName,
  listItem,
  listItemCancelledTag,
  listItemChildOf,
  listItemCompletedTag,
  listItemDates,
  listItemMenuActivate,
  listItemMenuAppendUnder,
  listItemMenuCancel,
  listItemMenuComplete,
  listItemMenuEdit,
  listItemMenuFocus,
  listItemMenuTags,
};

function inputName() {
  return cy.get("#input-name input");
}
function buttonAdd() {
  return cy.get("#button-add");
}

function listItem(name) {
  const strictlyText = new RegExp("^" + name + "$");
  return cy.contains(".item-name", strictlyText).parents(".artifact-item");
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

function listItemMenu(name) {
  return listItem(name).find(".actions-menu");
}

function listItemMenuTags(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-tags").click();
}

function listItemMenuFocus(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-focus").click();
}

function listItemMenuComplete(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-complete").click();
}

function listItemMenuCancel(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-cancel").click();
}

function listItemMenuActivate(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-activate").click();
}

function listItemMenuAppendUnder(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-append").click();
}

function listItemMenuEdit(name) {
  listItemMenu(name).click();
  return listItemMenu(name).find(".menu-edit").click();
}

function detailsTag(tagName) {
  return cy.get(dt(`tag-${tagName}`));
}
