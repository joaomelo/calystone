import { dataTest } from "./data-test";

export const pageOpen = {
  locale: {
    input: () => cy.get(dataTest("input-locale-input")),
    label: () => cy.get(dataTest("input-locale-label")),
    option: (locale: string) => pageOpen.locale.input().find("button").contains(locale),
  },
  open: { memory: () => cy.get(dataTest("open-memory")) },
  privacyLink: () => cy.get(dataTest("privacy-link")),
  termsLink: () => cy.get(dataTest("terms-link")),
  url: () => "/"
} as const;