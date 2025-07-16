import {
  dataTest, openMacros, outlineNodes, toolbarNode
} from "../helpers";

describe("rename", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  const selectors = {
    buttonSave: () => cy.get(dataTest("button-save")),
    inputError: () => cy.get(dataTest("input-name-error")),
    inputName: () => cy.get(dataTest("input-name-input")),
    modalError: () => cy.get(dataTest("modal-rename-error")),
  } as const;

  it("allows new name for directory", () => {
    outlineNodes.rootNode().click();
    toolbarNode.buttonRename().click();
    selectors.inputName().clear().type("new-directory-name");
    selectors.buttonSave().click();
    outlineNodes.rootNode().should("contain.text", "new-directory-name");
  });

  it("allows new name for artifacts", () => {
    const newName = "_new-artifact-name";
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    firstArtifact().click();
    toolbarNode.buttonRename().click();
    selectors.inputName().clear().type(newName);
    selectors.buttonSave().click();
    firstArtifact().should("contain.text", newName);

    function firstArtifact() {
      return outlineNodes.artifactOf(outlineNodes.rootNode()).first();
    }
  });

  it("fails if name is empty", () => {
    outlineNodes.rootNode().click();
    toolbarNode.buttonRename().click();
    selectors.inputName().clear();
    selectors.buttonSave().click();
    selectors.inputError().should("exist");
  });

  it("show backend errors", () => {
    outlineNodes.rootNode().click();
    toolbarNode.buttonRename().click();
    selectors.inputName().clear().type("/\\|");
    selectors.buttonSave().click();
    selectors.modalError().should("exist");
  });
});
