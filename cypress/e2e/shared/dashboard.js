export const dashboard = {
  sideSignOut,
  sideTags,
};

function sideSignOut() {
  return cy.get("#side-sign-out");
}

function sideTags() {
  return cy.get("#side-tags");
}
