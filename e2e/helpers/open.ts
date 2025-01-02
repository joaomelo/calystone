import { dataTest } from "./data-test";

export const pageOpen = {
  macros: {
    openMemory() {
      cy.visit("/");
      pageOpen.selectors.buttonOpenMemory().click();
    }
  },
  selectors: {
    buttonOpenMemory: () => cy.get(dataTest("open-memory"))
  }
} as const;