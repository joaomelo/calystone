import { dialogCreateArtifact, editorTodo, outlineNodes, pageOpen, toolbarNode } from "../helpers";

describe("create-and-edit-todo", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("creates todo inside a directory and edits it", () => {
    const todoName = "new-todo-name.todo";

    outlineNodes.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(todoName);
    dialogCreateArtifact.buttonSave().click();

    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.artifactTodoOf(outlineNodes.rootNode())
      .filter((_, el) => outlineNodes.labelOfElement(el) === todoName)
      .click();

    editorTodo.dates.tab().click();
    editorTodo.dates.inputStart().type("2025-01-01");
    editorTodo.dates.inputDue().should("have.value", "2025-01-01");
  });

  it("adds and removes tags", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.artifactTodoOf(outlineNodes.rootNode()).eq(0).click();

    editorTodo.tags.tab().click();

    editorTodo.tags.input().type("tag1");
    editorTodo.tags.buttonAdd().click();
    editorTodo.tags.chips().should("contain", "tag1");

    editorTodo.tags.input().type("tag2");
    editorTodo.tags.buttonAdd().click();
    editorTodo.tags.chips().should("contain", "tag2");

    editorTodo.tags.buttonRemove("tag1").click();
    editorTodo.tags.chips().should("not.contain", "tag1");
  });

  it("set recurrence that cycle dates when todo is completed", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.artifactTodoOf(outlineNodes.rootNode()).eq(0).click();

    editorTodo.dates.tab().click();
    editorTodo.dates.inputStart().type("2025-01-01");
    editorTodo.dates.inputReference.due().click();
    editorTodo.main.progress.done().click();

    editorTodo.dates.inputStart().should("have.value", "2025-01-02");
  });

});
