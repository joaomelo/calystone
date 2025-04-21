import { dialogCreateArtifact, editorTodo, outline, pageOpen, toolbarNode } from "../helpers";

describe("create-todo", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("creates todo inside a directory and edits it", () => {
    const todoName = "new-todo-name.todo";

    outline.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(todoName);
    dialogCreateArtifact.buttonSave().click();

    outline.toogleOf(outline.rootNode()).click();
    outline.artifactTodoOf(outline.rootNode())
      .filter((_, el) => outline.labelOfElement(el) === todoName)
      .click();

    editorTodo.dates.inputStart().type("2025-01-01");
    editorTodo.dates.inputDue().should("have.value", "2025-01-01");
  });

});
