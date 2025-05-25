import { dataTest } from "./data-test";

export const frameDashboard = {
  calendar: () => cy.get(dataTest("sidebar-calendar")),
  exit: () => cy.get(dataTest("sidebar-exit")),
  reload: () => cy.get(dataTest("sidebar-reload")),
  search: () => cy.get(dataTest("sidebar-search")),
  tags: () => cy.get(dataTest("sidebar-tags")),
} as const;