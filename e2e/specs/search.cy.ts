import { dialogCreateArtifact, dialogCreateDirectory, editorText, editorTodo, outlineNodes, pageOpen, pageSearch, toolbarNode } from "../helpers";

describe("editor-directory", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("fuzzy searches considering name and inner data of nodes", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.rootNode().click();

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
    outlineNodes.nodeLabeledAs(textName).click();
    editorText.type("meu teste de texto");

    outlineNodes.rootNode().click();

    const todoName = "file.todo";
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(todoName);
    dialogCreateArtifact.buttonSave().click();
    dialogCreateArtifact.buttonSave().should("not.exist");
    outlineNodes.nodeLabeledAs(todoName).click();
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