import {
  dataTest, openMacros, outlineNodesLegacy, toolbarNode
} from "../helpers";

describe("rename", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  const selectors = {
    buttonSave: () => cy.get(dataTest("button-save")),
    firstArtifact: () => outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first(),
    inputError: () => cy.get(dataTest("input-name-error")),
    inputName: () => cy.get(dataTest("input-name-input")),
    modalError: () => cy.get(dataTest("modal-rename-error"))
  } as const;

  it("allows new name for artifacts", () => {
    const newName = "_new-artifact-name";
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    selectors.firstArtifact().click();
    toolbarNode.buttonRename().click();
    selectors.inputName().clear().type(newName);
    selectors.buttonSave().click();
    selectors.firstArtifact().should("contain.text", newName);
  });

  it("fails if name is empty", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    selectors.firstArtifact().click();

    toolbarNode.buttonRename().click();
    selectors.inputName().clear();
    selectors.buttonSave().click();
    selectors.inputError().should("exist");
  });

  it("show backend errors", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    selectors.firstArtifact().click();
    toolbarNode.buttonRename().click();
    selectors.inputName().clear().type("/\\|");
    selectors.buttonSave().click();
    selectors.modalError().should("exist");
  });
});
