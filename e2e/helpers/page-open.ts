import { dataTest } from "./data-test";

export const pageOpen = {
  macros: {
    openMemory() {
      cy.visit("/");
      pageOpen.selectors.buttonOpenMemory().click();
    }
  },
  selectors: {
    buttonOpenMemory: () => cy.get(dataTest("open-memory")),
    privacyLink: () => cy.get(dataTest("privacy-link")),
    termsLink: () => cy.get(dataTest("terms-link")),
    url: () => "/"
  }
} as const;