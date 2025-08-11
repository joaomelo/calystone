import { openMemory } from "../macros";
import {
  editorText,
  editorTodo,
  modalCreateArtifact,
  modalCreateDirectory,
  outlineNodesLegacy,
  pageSearch,
  toolbarNode
} from "../selectors";

describe("page-search", () => {
  beforeEach(() => {
    openMemory();
  });

  it("fuzzy searches considering name and inner data of nodes", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.rootNodeContent().click();

    const directoryName = "téste";
    toolbarNode.buttonCreateDirectory().click();
    modalCreateDirectory.inputName().clear().type(directoryName);
    modalCreateDirectory.buttonSave().click();
    modalCreateDirectory.buttonSave().should("not.exist");

    const binaryName = "test.exe";
    toolbarNode.buttonCreateArtifact().click();
    modalCreateArtifact.inputName().clear().type(binaryName);
    modalCreateArtifact.buttonSave().click();
    modalCreateArtifact.buttonSave().should("not.exist");

    const textName = "file.txt";
    toolbarNode.buttonCreateArtifact().click();
    modalCreateArtifact.inputName().clear().type(textName);
    modalCreateArtifact.buttonSave().click();
    modalCreateArtifact.buttonSave().should("not.exist");
    outlineNodesLegacy.nodeLabeledAs(textName).click();
    editorText.type("meu teste de texto");

    outlineNodesLegacy.rootNodeContent().click();

    const todoName = "file.todo";
    toolbarNode.buttonCreateArtifact().click();
    modalCreateArtifact.inputName().clear().type(todoName);
    modalCreateArtifact.buttonSave().click();
    modalCreateArtifact.buttonSave().should("not.exist");
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