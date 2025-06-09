import { dialogCreateArtifact, editorText, openMacros, outlineNodes, toolbarNode } from "../helpers";

describe("editor-binary", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("creates text file and edits it", () => {
    const textArtifactName = "sibling.txt";

    outlineNodes.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(textArtifactName);
    dialogCreateArtifact.buttonSave().click();

    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.artifactTextOf(outlineNodes.rootNode()).should("contain.text", textArtifactName);

    outlineNodes.nodeLabeledAs(textArtifactName).first().click();
    editorText.input().should("exist");
  });
});