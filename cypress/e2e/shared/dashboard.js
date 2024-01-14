export const dashboard = {
  sideOutline,
  sideSignOut,
  sideTags,
};

function sideSignOut() {
  return cy.get("#side-sign-out");
}

function sideOutline() {
  return cy.get("#side-outline");
}

function sideTags() {
  return cy.get("#side-tags");
}
