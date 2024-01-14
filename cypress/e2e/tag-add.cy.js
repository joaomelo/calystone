import { signUpPage, tagsPage } from "./shared";

describe("tag add", () => {
  beforeEach(() => {
    cy.clearData();
    signUpPage.signUpAuto();
    tagsPage.sideTags().click();
  });

  it("creates a tag from the tags page", () => {
    const name = "my tag";
    tagsPage.add(name);

    tagsPage.listItem(name);
  });
});
