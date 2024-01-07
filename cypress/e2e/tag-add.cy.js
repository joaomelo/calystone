import { signUpPage, tagsPage } from "./shared";

describe("tag add", () => {
  beforeEach(() => {
    cy.clearData();
    signUpPage.signUpAuto();
  });

  it("creates an tag from the tags page", () => {
    const name = "my tag";
    tagsPage.add(name);

    tagsPage.listItem(name);
  });
});
