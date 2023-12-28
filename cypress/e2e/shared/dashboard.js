export const dashboard = {
  sideSignOut,
};

function sideSignOut() {
  return cy.get("#side-sign-out");
}
