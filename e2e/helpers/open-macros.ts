import { pageOpen } from "./page-open";

export const openMacros = { openMemory() {
  cy.visit("/");
  pageOpen.open.memory().click();
} } as const;