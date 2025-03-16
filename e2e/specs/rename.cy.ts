import { dataTest, pageOpen, pageOutline } from "../helpers";

describe("rename", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  const selectors = {
    buttonRename: () => cy.get(dataTest("button-rename")),
    buttonSave: () => cy.get(dataTest("button-save")),
    inputError: () => cy.get(dataTest("input-name-error")),
    inputName: () => cy.get(dataTest("input-name-input")),
    modalError: () => cy.get(dataTest("modal-rename-error")),
  } as const;

  it("allows new name for directory", () => {
    pageOutline.selectors.tree.rootNode().click();
    selectors.buttonRename().click();
    selectors.inputName().clear().type("new-directory-name");
    selectors.buttonSave().click();
    pageOutline.selectors.tree.rootNode().should("contain.text", "new-directory-name");
  });

  it("allows new name for artifacts", () => {
    const newName = "_new-artifact-name";
    pageOutline.selectors.tree.toogleOf(pageOutline.selectors.tree.rootNode()).click();
    firstArtifact().click();
    selectors.buttonRename().click();
    selectors.inputName().clear().type(newName);
    selectors.buttonSave().click();
    firstArtifact().should("contain.text", newName);

    function firstArtifact() {
      return pageOutline.selectors.tree.artifactOf(pageOutline.selectors.tree.rootNode()).first();
    }
  });

  it("fails if name is empty", () => {
    pageOutline.selectors.tree.rootNode().click();
    selectors.buttonRename().click();
    selectors.inputName().clear();
    selectors.buttonSave().click();
    selectors.inputError().should("exist");
  });

  it("show backend errors", () => {
    pageOutline.selectors.tree.rootNode().click();
    selectors.buttonRename().click();
    selectors.inputName().clear().type("/\\|");
    selectors.buttonSave().click();
    selectors.modalError().should("exist");
  });
});
