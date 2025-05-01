import { dataTest } from "./data-test";

export const frameDashboard = {
  exit: () => cy.get(dataTest("sidebar-exit")),
  reload: () => cy.get(dataTest("sidebar-reload")),
  tags: () => cy.get(dataTest("sidebar-tags")),
} as const;