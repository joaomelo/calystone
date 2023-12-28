export const sign = {
  inputEmail,
  inputPassword,
};

function inputEmail() {
  return cy.get("#input-email input");
}
function inputPassword() {
  return cy.get("#input-password input");
}
