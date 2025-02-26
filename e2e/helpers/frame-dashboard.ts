import { dataTest } from "./data-test";

export const frameDashboard = {
  selectors: {
    exit: () => cy.get(dataTest("exit")),
    reload: () => cy.get(dataTest("reload"))
  }
} as const;