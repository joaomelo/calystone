import { dataTest } from "../helpers";

export const frameDashboard = {
  calendar: () => cy.get(dataTest("sidebar-calendar")),
  exit: () => cy.get(dataTest("sidebar-exit")),
  preloading: () => cy.get(dataTest("sidebar-preloading")),
  priority: () => cy.get(dataTest("sidebar-priority")),
  search: () => cy.get(dataTest("sidebar-search")),
  tags: () => cy.get(dataTest("sidebar-tags")),
} as const;