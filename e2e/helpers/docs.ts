import { dataTest } from "./data-test";

export const docs = { openLink: () => cy.get(dataTest("open-link")), } as const;