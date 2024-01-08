import { signUpPage, tagsPage } from "./shared";

describe("tag delete", () => {
  beforeEach(() => {
    cy.clearData();
    signUpPage.signUpAuto();
  });

  it("deletes a tag from the tags page", () => {
    const name = "my tag";
    tagsPage.add(name);

    tagsPage.del(name);

    cy.contains(name).should("not.exist");
  });
});
