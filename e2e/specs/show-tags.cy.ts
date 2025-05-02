import { dialogCreateArtifact, editorTodo, outlineNodes, outlineTags, pageOpen, toolbarNode } from "../helpers";
import { pageTags } from "../helpers/page-tags";

describe("show tags", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("show tags based on todos", () => {
    outlineNodes.rootNode().click();
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.childrenOf(outlineNodes.rootNode()).should("have.length.greaterThan", 0);

    const highPriorityBaseName = "high-priority-todo";
    const highPriorityTodoName = `${highPriorityBaseName}.todo`;
    const highPriorityTodoTag = `${highPriorityBaseName}-tag`;
    const sharedTodosTag = "shared-todos-tag";
    createTodo({ importance: "2", name: highPriorityTodoName, tags: [highPriorityTodoTag, sharedTodosTag], urgency: "2" });

    const lowPriorityBaseName = "low-priority-todo";
    const lowPriorityTodoName = `${lowPriorityBaseName}.todo`;
    const lowPriorityTodoTag = `${lowPriorityBaseName}-tag`;
    createTodo({ importance: "1", name: lowPriorityTodoName, tags: [lowPriorityTodoTag, sharedTodosTag], urgency: "1" });

    pageTags.tags().click();

    outlineTags.toogleOf(highPriorityTodoTag).click();
    outlineTags.todosOf(highPriorityTodoTag).should("have.length", 1);

    outlineTags.toogleOf(lowPriorityTodoTag).click();
    outlineTags.todosOf(lowPriorityTodoTag).should("have.length", 1);

    outlineTags.toogleOf(sharedTodosTag).click();
    outlineTags.todosOf(sharedTodosTag).eq(0).should("include.text", highPriorityBaseName);
    outlineTags.todosOf(sharedTodosTag).eq(1).should("include.text", lowPriorityBaseName);
  });

  function createTodo(options: { importance: string, name: string, tags: string[], urgency: string }) {
    const { name, tags } = options;
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(name);
    dialogCreateArtifact.buttonSave().click();

    outlineNodes.nodeLabeledAs(name).click();

    editorTodo.tags.tab().click();

    tags.forEach((tag) => {
      editorTodo.tags.input().clear().type(tag);
      editorTodo.tags.buttonAdd().click();
    });

    editorTodo.priority.tab().click();
    editorTodo.priority.inputImportance().type(options.importance);
    editorTodo.priority.inputUrgency().type(options.urgency);
  }
});