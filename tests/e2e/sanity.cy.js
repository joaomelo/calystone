describe("sanity", () => {
  it("visit initial page", () => {
    cy.visit("/");
    cy.contains("calystone");
  });
});
