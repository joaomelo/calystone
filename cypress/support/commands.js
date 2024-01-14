Cypress.Commands.add("clearData", () => {
  cy.request(
    "DELETE",
    "http://127.0.0.1:8080/emulator/v1/projects/demo-test/databases/(default)/documents",
  );
  cy.request(
    "DELETE",
    "http://127.0.0.1:9099/emulator/v1/projects/demo-test/accounts",
  );
});

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test="${selector}"]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*="${selector}"]`, ...args);
});
