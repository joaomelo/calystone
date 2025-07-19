import {
  dialogCreateArtifact, dialogCreateDirectory, editorText, editorTodo, openMacros, outlineNodesLegacy, pageSearch, toolbarNode
} from "../helpers";

describe("editor-directory", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("fuzzy searches considering name and inner data of nodes", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.rootNodeContent().click();

    const directoryName = "téste";
    toolbarNode.buttonCreateDirectory().click();
    dialogCreateDirectory.inputName().clear().type(directoryName);
    dialogCreateDirectory.buttonSave().click();
    dialogCreateDirectory.buttonSave().should("not.exist");

    const binaryName = "test.exe";
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(binaryName);
    dialogCreateArtifact.buttonSave().click();
    dialogCreateArtifact.buttonSave().should("not.exist");

    const textName = "file.txt";
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(textName);
    dialogCreateArtifact.buttonSave().click();
    dialogCreateArtifact.buttonSave().should("not.exist");
    outlineNodesLegacy.nodeLabeledAs(textName).click();
    editorText.type("meu teste de texto");

    outlineNodesLegacy.rootNodeContent().click();

    const todoName = "file.todo";
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(todoName);
    dialogCreateArtifact.buttonSave().click();
    dialogCreateArtifact.buttonSave().should("not.exist");
    outlineNodesLegacy.nodeLabeledAs(todoName).click();
    editorTodo.tags.tab().click();
    editorTodo.tags.input().type("TESTE");
    editorTodo.tags.buttonAdd().click();

    pageSearch.search().click();
    pageSearch.input().type("test");

    pageSearch.resultItem(directoryName).should("exist");
    pageSearch.resultItem(binaryName).should("exist");
    pageSearch.resultItem(textName).should("exist");
    pageSearch.resultItem(todoName).should("exist");
  });

});