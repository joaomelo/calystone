import { dataTest } from "./data-test";

export const pageOpen = {
  buttonOpenFsa: () => cy.get(dataTest("button-open-fsa"))
};