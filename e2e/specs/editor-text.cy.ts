import {
  modalCreateArtifact,
  editorText,
  openMacros,
  outlineNodesLegacy,
  toolbarNode
} from "../helpers";

describe("editor-binary", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("creates text file and edits it", () => {
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
});