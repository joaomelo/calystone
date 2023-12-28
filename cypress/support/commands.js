Cypress.Commands.add("clearData", () => {
  cy.request(
    "DELETE",
    "http://127.0.0.1:8080/emulator/v1/projects/demo-test/databases/(default)/documents"
  );
  cy.request(
    "DELETE",
    "http://127.0.0.1:9099/emulator/v1/projects/demo-test/accounts"
  );
});
