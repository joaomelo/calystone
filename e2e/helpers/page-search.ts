import { dataTest } from "./data-test";
import { frameDashboard } from "./frame-dashboard";

export const pageSearch = {
  input: () => cy.get(dataTest("input-search")),
  resultItem: (name: string) => cy.get("li").contains(name),
  results: () => cy.get(dataTest("search-results")),
  url: () => "/search",
  ...frameDashboard
} as const;