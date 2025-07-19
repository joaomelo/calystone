import {
  createTodo, openMacros, outlineNodesLegacy, outlineTags
} from "../helpers";
import { pageTags } from "../helpers/page-tags";

describe("show tags", () => {
  beforeEach(() => {
    openMacros.openMemory();
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

    outlineTags.toogleOf(highPriorityTodoTag).click();
    outlineTags.todosOf(highPriorityTodoTag).should("have.length", 1);

    outlineTags.toogleOf(lowPriorityTodoTag).click();
    outlineTags.todosOf(lowPriorityTodoTag).should("have.length", 1);

    outlineTags.toogleOf(sharedTodosTag).click();
    outlineTags.todosOf(sharedTodosTag).eq(0).should("include.text", highPriorityBaseName);
    outlineTags.todosOf(sharedTodosTag).eq(1).should("include.text", lowPriorityBaseName);
  });

});