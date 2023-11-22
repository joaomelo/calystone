describe("sanity", () => {
  it("visit active auth page", () => {
    cy.visit("/");
    cy.get("#input-email input").type("test@test.com");
    cy.get("#input-password input").type("1234567890");
    cy.get("#button-sign-in").click();
    cy.contains("user-not-found");
  });
});
