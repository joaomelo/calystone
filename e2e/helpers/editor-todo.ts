import { dataTest } from "./data-test";
import { typeableDate, typeableDateTime } from "./dates";

const inputStartInput = () => cy.get(dataTest("input-start")).find("input");
const inputDueInput = () => cy.get(dataTest("input-due")).find("input");

export const editorTodo = {
  dates: {
    inputAllDay: () => cy.get(dataTest("input-all-day")).find("input"),
    inputDue: {
      input: inputDueInput,
      typeDate(date: Date) {
        inputDueInput()
          .invoke("val", typeableDate(date))
          .trigger("input");
      },
      typeDateTime(date: Date) {
        inputDueInput()
          .invoke("val", typeableDateTime(date))
          .trigger("input");
      },
    },
    inputReference: {
      completion: () => cy.get("[data-test='input-reference-input'] button").eq(1),
      disabled: () => cy.get("[data-test='input-reference-input'] button").eq(0),
      due: () => cy.get("[data-test='input-reference-input'] button").eq(2),
    },
    inputStart: {
      input: inputStartInput,
      typeDate(date: Date) {
        inputStartInput()
          .invoke("val", typeableDate(date))
          .trigger("input");
      },
      typeDateTime(date: Date) {
        inputStartInput()
          .invoke("val", typeableDateTime(date))
          .trigger("input");
      },
    },
    tab: () => cy.get(dataTest("accordion-panels-panel-dates")),
  },
  main: {
    progress: {
      doing: () => cy.get("[data-test='button-doing']"),
      done: () => cy.get("[data-test='button-done']"),
      open: () => cy.get("[data-test='button-open']"),
      skipped: () => cy.get("[data-test='button-skipped']"),
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