import {
  dialogCreateArtifact,
  editorBinary,
  openMacros,
  outlineNodesLegacy,
  toolbarNode
} from "../helpers";

describe("editor-binary", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("shows artifact binary data according to directory status", () => {
    const artifactName = "new-artifact-name.exe";

    outlineNodesLegacy.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(artifactName);
    dialogCreateArtifact.buttonSave().click();

    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactBinaryOf(outlineNodesLegacy.rootNode()).should("contain.text", artifactName);

    outlineNodesLegacy.labelOf(outlineNodesLegacy.rootNode()).then(label => {
      outlineNodesLegacy.nodeLabeledAs(artifactName).first().click();
      editorBinary.typeLabel().should("exist");
      editorBinary.sizeLabel().should("exist");
      editorBinary.pathLabel().should("exist");
      editorBinary.pathValue().should("contain.text", `/${label}/${artifactName}`);
      editorBinary.lastModifiedLabel().should("exist");
    });

  });
});