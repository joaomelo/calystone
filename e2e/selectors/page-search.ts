import { dataTest } from "../helpers";
import { frameDashboard } from "./frame-dashboard";

const results = () => cy.get(dataTest("outline-search__results"));

export const pageSearch = {
  input: () => cy.get(dataTest("outline-search__input")),
  resultItem: (name: string) => results().find("li").contains(name),
  results,
  url: () => "/search",
  ...frameDashboard
} as const;