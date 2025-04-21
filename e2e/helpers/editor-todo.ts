import { dataTest } from "./data-test";

export const editorTodo = {
  dates: {
    inputDue: () => cy.get(dataTest("input-due")).find("input"),
    inputStart: () => cy.get(dataTest("input-start")).find("input"),
  }
} as const;