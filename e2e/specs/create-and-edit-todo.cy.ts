import {
  createTodo, dialogCreateArtifact, editorTodo, openMacros, outlineNodes, toolbarNode, typeableDate, typicalDates
} from "../helpers";

describe("create-and-edit-todo", () => {
  beforeEach(() => {
    openMacros.openMemory();
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
    editorTodo.dates.inputAllDay().click();
    editorTodo.dates.inputStart.typeDate(typicalDates.today.start);
    editorTodo.dates.inputDue.input().should("have.value", typeableDate(typicalDates.today.end));
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
    editorTodo.dates.inputAllDay().click();
    editorTodo.dates.inputStart.typeDate(typicalDates.today.start);
    editorTodo.dates.inputReference.due().click();
    editorTodo.main.progress.done().click();

    editorTodo.dates.inputStart.input().should("have.value", typeableDate(typicalDates.tomorrow.start));
  });

  it.only("adds, set and remove prioriti criteria", () => {
    outlineNodes.rootNode().click();
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();

    const todoBaseName = "low-priority-todo";
    const todoName = `${todoBaseName}.todo`;
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
      name: todoName,
      tags: [],
    });

    editorTodo.priority.title().should("contain", "0.50");

    editorTodo.priority.manage.delete("urgency").click();
    editorTodo.priority.title().should("contain", "1.00");
  });

});
