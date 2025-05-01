import { dataTest } from "./data-test";

export const editorTodo = {
  dates: {
    inputDue: () => cy.get(dataTest("input-due")).find("input"),
    inputStart: () => cy.get(dataTest("input-start")).find("input"),
    tab: () => cy.get(dataTest("tabs-panels-tab-dates")),
  },
  priority: {
    inputImportance: () => cy.get(dataTest("input-importance")).find("input"),
    inputUrgency: () => cy.get(dataTest("input-urgency")).find("input"),
    tab: () => cy.get(dataTest("tabs-panels-tab-more")),
  },
  tags: {
    buttonAdd: () => cy.get(dataTest("button-add-tag")),
    buttonRemove: (tag: string) => cy.get(dataTest(`chip-tags-tags-${tag}`)).find(".p-chip-remove-icon"),
    chips: () => cy.get(dataTest("chip-tags-tags")),
    input: () => cy.get(dataTest("input-tag-input")),
    tab: () => cy.get(dataTest("tabs-panels-tab-more")),
  },

} as const;