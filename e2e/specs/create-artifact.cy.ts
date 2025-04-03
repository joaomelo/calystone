import { dataTest, outline, pageOpen, toolbarNode } from "../helpers";

describe("create-artifact", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  const dialogCreateArtifact = {
    buttonSave: () => cy.get(dataTest("button-save")),
    inputError: () => cy.get(dataTest("input-name-error")),
    inputName: () => cy.get(dataTest("input-name-input")),
    modalError: () => cy.get(dataTest("modal-create-artifact-error")),
  } as const;

  it("creates artifact inside a directory", () => {
    const artifactName = "new-artifact-name.txt";

    outline.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    dialogCreateArtifact.inputName().clear().type(artifactName);
    dialogCreateArtifact.buttonSave().click();

    outline.toogleOf(outline.rootNode()).click();
    outline.artifactOf(outline.rootNode()).should("contain.text", artifactName);
  });

  it("does not show create directory toolbar button if artifact is selected", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.artifactOf(outline.rootNode()).first().click();
    toolbarNode.buttonCreateArtifact().should("not.exist");
  });
});
