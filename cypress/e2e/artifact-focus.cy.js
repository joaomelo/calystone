import { outlinePage, signUpPage } from "./shared";

describe("artifacts focus", () => {
  beforeEach(() => cy.clearData());

  it("focus on root artifact", () => {
    signUpPage.signUp({ email: "test@test.com", password: "1234567890" });

    const name = "task 1";
    outlinePage.add(name);
    outlinePage.listItemMenuFocus(name);

    outlinePage.crumb(name);
  });
});
