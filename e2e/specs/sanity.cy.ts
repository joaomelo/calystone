describe("sanity", function() {
  it("visit initial page", function() {
    cy.visit("/");
    cy.contains("calystone");
  });
});
