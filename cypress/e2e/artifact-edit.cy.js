import { signUpPage, outlinePage } from "./shared";

describe("artifact edit", () => {
  beforeEach(() => {
    cy.clearData();
    signUpPage.signUpAuto();
  });

  it("edit artifact name in the outline", () => {
    const parentName = "task 1";
    outlinePage.add(parentName);
    outlinePage.appendUnder(parentName);

    const name = "task 1.1";
    outlinePage.listItemChildOf(parentName).type(`${name}{enter}`);

    outlinePage.listItem(name);
  });
});
