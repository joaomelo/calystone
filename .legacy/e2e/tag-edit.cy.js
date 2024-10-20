import { signUpPage, tagsPage } from "./shared";

describe("tag edit", () => {
  beforeEach(() => {
    cy.clearData();
    signUpPage.signUpAuto();
    tagsPage.sideTags().click();
  });

  it("edit tag in the tags list", () => {
    const name = "t";
    tagsPage.add(name);

    const newName = "new tag";
    tagsPage.listItem(name).type(`{backspace}${newName}{enter}`);

    tagsPage.listItem(newName);
  });
});
