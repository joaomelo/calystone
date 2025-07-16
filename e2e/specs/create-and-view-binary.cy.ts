import {
  dialogCreateArtifact, editorBinary, openMacros, outlineNodes, toolbarNode
} from "../helpers";

describe("editor-binary", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("shows artifact binary data according to directory status", () => {
    const artifactName = "new-artifact-name.exe";

    outlineNodes.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(artifactName);
    dialogCreateArtifact.buttonSave().click();

    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.artifactBinaryOf(outlineNodes.rootNode()).should("contain.text", artifactName);

    outlineNodes.labelOf(outlineNodes.rootNode()).then(label => {
      outlineNodes.nodeLabeledAs(artifactName).first().click();
      editorBinary.typeLabel().should("exist");
      editorBinary.sizeLabel().should("exist");
      editorBinary.pathLabel().should("exist");
      editorBinary.pathValue().should("contain.text", `/${label}/${artifactName}`);
      editorBinary.lastModifiedLabel().should("exist");
    });

  });
});