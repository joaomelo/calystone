import { signUp, outlineSelectors } from "./shared";

describe("artifact add", () => {
  beforeEach(() => cy.clearData());

  it("creates an artifact from the outline root", () => {
    const email = "test@test.com";
    const password = "1234567890";
    signUp({ email, password });

    const name = "task 1";
    cy.get(outlineSelectors.inputName).type(name);
    cy.get(outlineSelectors.buttonAdd).click();
    cy.get(outlineSelectors.lisItemContent).should("have.text", name);
  });

  it("creates an artifact while focused", () => {
    const email = "test@test.com";
    const password = "1234567890";
    signUp({ email, password });

    const name = "task 1";
    cy.get(outlineSelectors.inputName).type(name);
    cy.get(outlineSelectors.buttonAdd).click();
    cy.get(outlineSelectors.lisItemContent).should("have.text", name);
  });
});
