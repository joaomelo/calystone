import { pageOpen } from "../selectors";

export function openDropbox() {
  cy.visit("/");
  pageOpen.open.dropbox().click();
}

export function openMemory() {
  cy.visit("/");
  pageOpen.open.memory().click();
}

export function openOneDrive() {
  cy.visit("/");
  pageOpen.open.oneDrive().click();
}
