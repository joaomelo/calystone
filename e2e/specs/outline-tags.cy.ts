import {
  createTodo,
  openMemory,
} from "../macros";
import {
  outlineNodesLegacy,
  outlineTags,
  pageTags
} from "../selectors";

describe("outline-tags", () => {
  beforeEach(() => {
    openMemory();
  });

  it("show tags based on todos", () => {
    outlineNodesLegacy.rootNode().click();
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.childrenOf(outlineNodesLegacy.rootNode()).should("have.length.greaterThan", 0);

    const highPriorityBaseName = "high-priority-todo";
    const highPriorityTodoName = `${highPriorityBaseName}.todo`;
    const highPriorityTodoTag = `${highPriorityBaseName}-tag`;
    const sharedTodosTag = "shared-todos-tag";
    createTodo({
      criteria: [
        {
          label: "importance",
          value: "1"
        },
        {
          label: "urgency",
          value: "1"
        }
      ],
      name: highPriorityTodoName,
      tags: [highPriorityTodoTag, sharedTodosTag],
    });

    const lowPriorityBaseName = "low-priority-todo";
    const lowPriorityTodoName = `${lowPriorityBaseName}.todo`;
    const lowPriorityTodoTag = `${lowPriorityBaseName}-tag`;
    createTodo({
      criteria: [
        {
          label: "importance",
          value: "1"
        },
        {
          label: "urgency",
          value: "0"
        }
      ],
      name: lowPriorityTodoName,
      tags: [lowPriorityTodoTag, sharedTodosTag],
    });

    pageTags.tags().click();

    cy.get(outlineTags.filters.tag.input).click();
    cy.get(outlineTags.filters.tag.option(highPriorityTodoTag)).click();
    cy.get(outlineTags.nodes.node).should("have.length", 1);

    cy.get(outlineTags.filters.tag.input).click();
    cy.get(outlineTags.filters.tag.option(lowPriorityTodoTag)).click();
    cy.get(outlineTags.nodes.node).should("have.length", 1);

    cy.get(outlineTags.filters.tag.input).click();
    cy.get(outlineTags.filters.tag.option(sharedTodosTag)).click();
    cy.get(outlineTags.nodes.node).eq(0).should("include.text", highPriorityBaseName);
    cy.get(outlineTags.nodes.node).eq(1).should("include.text", lowPriorityBaseName);
  });

});