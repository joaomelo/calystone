import { dataTest } from "./data-test";

export const editorTodo = {
  dates: {
    inputDue: () => cy.get(dataTest("input-due")).find("input"),
    inputReference: {
      completion: () => cy.get("[data-test='input-reference-input'] button").eq(1),
      disabled: () => cy.get("[data-test='input-reference-input'] button").eq(0),
      due: () => cy.get("[data-test='input-reference-input'] button").eq(2),
    },
    inputStart: () => cy.get(dataTest("input-start")).find("input"),
    tab: () => cy.get(dataTest("accordion-panels-panel-dates")),
  },
  main: {
    progress: {
      doing: () => cy.get("[data-test='input-progress-input'] button").eq(1),
      done: () => cy.get("[data-test='input-progress-input'] button").eq(2),
      open: () => cy.get("[data-test='input-progress-input'] button").eq(0),
      skipped: () => cy.get("[data-test='input-progress-input'] button").eq(3),
    }
  },
  priority: {
    inputImportance: () => cy.get(dataTest("input-importance")).find("input"),
    inputUrgency: () => cy.get(dataTest("input-urgency")).find("input"),
    tab: () => cy.get(dataTest("accordion-panels-panel-priority")),
  },
  tags: {
    buttonAdd: () => cy.get(dataTest("button-add-tag")),
    buttonRemove: (tag: string) => cy.get(dataTest(`chip-tags-tags-${tag}`)).find(".p-chip-remove-icon"),
    chips: () => cy.get(dataTest("chip-tags-tags")),
    input: () => cy.get(dataTest("input-tag-input")),
    tab: () => cy.get(dataTest("accordion-panels-panel-tags")),
  },

} as const;