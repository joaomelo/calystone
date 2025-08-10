import {
  editorText,
  modalCreateArtifact,
  openMacros,
  outlineNodesLegacy,
  toolbarNode
} from "../helpers";

describe("modal-create-artifact", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("creates text file", () => {
    const textArtifactName = "sibling.txt";

    outlineNodesLegacy.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    modalCreateArtifact.inputName().clear().type(textArtifactName);
    modalCreateArtifact.buttonSave().click();

    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactTextOf(outlineNodesLegacy.rootNode()).should("contain.text", textArtifactName);

    outlineNodesLegacy.nodeLabeledAs(textArtifactName).first().click();
    editorText.input().should("exist");
  });

  it("criate binary artifact data", () => {
    const artifactName = "new-artifact-name.exe";

    outlineNodesLegacy.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    modalCreateArtifact.inputName().clear().type(artifactName);
    modalCreateArtifact.buttonSave().click();

    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactBinaryOf(outlineNodesLegacy.rootNode()).should("contain.text", artifactName);
  });

  it("creates todo inside a directory", () => {
    const todoName = "new-todo-name.todo";

    outlineNodesLegacy.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    modalCreateArtifact.inputName().clear().type(todoName);
    modalCreateArtifact.buttonSave().click();

    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactTodoOf(outlineNodesLegacy.rootNode())
      .filter((_, el) => outlineNodesLegacy.labelOfElement(el) === todoName)
      .click();

    editorTodo.dates.tab().click();
    editorTodo.dates.inputAllDay().click();
    editorTodo.dates.inputStart.typeDate(typicalDates.today.start);
    editorTodo.dates.inputDue.input().should("have.value", typeableDate(typicalDates.today.end));
  });
});