import { dialogCreateArtifact, outline, pageOpen, toolbarNode } from "../helpers";

describe("create-artifact", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("creates artifact inside a directory", () => {
    const artifactName = "new-artifact-name.txt";

    outlineNodes.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(artifactName);
    dialogCreateArtifact.buttonSave().click();

    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.artifactOf(outlineNodes.rootNode()).should("contain.text", artifactName);
  });

  it("creates sibling artifact if one is selected", () => {
    const siblingName = "sibling.txt";

    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.artifactOf(outlineNodes.rootNode()).first().click();
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(siblingName);
    dialogCreateArtifact.buttonSave().click();

    outlineNodes.artifactOf(outlineNodes.rootNode()).should("contain.text", siblingName);
  });
});
