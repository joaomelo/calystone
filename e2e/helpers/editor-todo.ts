import { dataTest } from "./data-test";

export const editorTodo = {
  dates: {
    inputDue: () => cy.get(dataTest("input-due")).find("input"),
    inputStart: () => cy.get(dataTest("input-start")).find("input"),
    tabDates: () => cy.get(dataTest("tabs-panels-tab-dates")),
  }
} as const;