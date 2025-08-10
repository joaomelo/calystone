import { dataTest } from "../helpers";

export const docs = { openLink: () => cy.get(dataTest("open-link")), } as const;