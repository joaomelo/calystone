import { dataTest } from "../helpers";

const pagesTermsPrivacy = { openLink: () => cy.get(dataTest("open-link")), } as const;

export const pageTerms = { ...pagesTermsPrivacy } as const;

export const pagePrivacy = { ...pagesTermsPrivacy } as const;