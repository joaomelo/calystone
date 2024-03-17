export const sign = {
  inputEmail,
  inputPassword,
  linkSign,
};

function inputEmail() {
  return cy.get("#input-email input");
}
function inputPassword() {
  return cy.get("#input-password input");
}

function linkSign() {
  return cy.get("#link-sign");
}
