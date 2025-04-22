import { dialogCreateArtifact, outline, pageOpen, toolbarNode } from "../helpers";

describe("create-artifact", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("creates artifact inside a directory", () => {
    const artifactName = "new-artifact-name.txt";

    outline.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(artifactName);
    dialogCreateArtifact.buttonSave().click();

    outline.toogleOf(outline.rootNode()).click();
    outline.artifactOf(outline.rootNode()).should("contain.text", artifactName);
  });

  it("creates sibling artifact if one is selected", () => {
    const siblingName = "sibling.txt";

    outline.toogleOf(outline.rootNode()).click();
    outline.artifactOf(outline.rootNode()).first().click();
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(siblingName);
    dialogCreateArtifact.buttonSave().click();

    outline.artifactOf(outline.rootNode()).should("contain.text", siblingName);
  });
});
