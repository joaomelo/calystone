import { outlinePage, signUpPage } from "./shared";

describe("artifact add", () => {
  beforeEach(() => {
    cy.clearData();
    signUpPage.signUpAuto();
  });

  it("creates an artifact from the outline root", () => {
    const name = "task 1";
    outlinePage.add(name);

    outlinePage.listItem(name);
  });

  it("creates an artifact while focused", () => {
    const parentName = "task 1";
    outlinePage.add(parentName);
    outlinePage.focus(parentName);

    const name = "task 1.1";
    outlinePage.add(name);

    outlinePage.listItem(name);
  });

  it("creates an artifact through append", () => {
    const parentName = "task 1";
    outlinePage.add(parentName);

    outlinePage.appendUnder(parentName);

    outlinePage.listItemChildOf(parentName);
  });
});
