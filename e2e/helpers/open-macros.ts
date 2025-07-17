import { pageOpen } from "./page-open";

export const openMacros = {
  openDropbox() {
    cy.visit("/");
    pageOpen.open.dropbox().click();
  },
  openMemory() {
    cy.visit("/");
    pageOpen.open.memory().click();
  },
  openOneDrive() {
    cy.visit("/");
    pageOpen.open.oneDrive().click();
  },
} as const;