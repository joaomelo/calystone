import { dataTest } from "../helpers";

export const pageOpen = {
  locale: {
    input: () => cy.get(dataTest("input-locale-input")),
    label: () => cy.get(dataTest("input-locale-label")),
    option: (locale: string) => pageOpen.locale.input().find("button").contains(locale),
  },
  open: {
    dropbox: () => cy.get(dataTest("open-dropbox")),
    memory: () => cy.get(dataTest("open-memory")),
    oneDrive: () => cy.get(dataTest("open-one-drive")),
  },
  privacyLink: () => cy.get(dataTest("privacy-link")),
  termsLink: () => cy.get(dataTest("terms-link")),
  url: () => "/"
} as const;