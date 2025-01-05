import { dataTest } from "./data-test";

export const frameDashboard = {
  selectors: {
    open: () => cy.get(dataTest("open"))
  }
} as const;