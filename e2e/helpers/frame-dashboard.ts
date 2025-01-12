import { dataTest } from "./data-test";

export const frameDashboard = {
  selectors: {
    exit: () => cy.get(dataTest("exit"))
  }
} as const;