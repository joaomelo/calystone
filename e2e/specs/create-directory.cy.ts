import { dataTest, outline, pageOpen, toolbarNode } from "../helpers";

describe("create-directory", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  const dialogCreateDirectory = {
    buttonSave: () => cy.get(dataTest("button-save")),
    inputError: () => cy.get(dataTest("input-name-error")),
    inputName: () => cy.get(dataTest("input-name-input")),
    modalError: () => cy.get(dataTest("modal-create-directory-error")),
  } as const;

  it("creates directory inside another directory", () => {
    outline.rootNode().click();
    toolbarNode.buttonCreateDirectory().click();
    dialogCreateDirectory.inputName().clear().type("new-directory-name");
    dialogCreateDirectory.buttonSave().click();

    outline.toogleOf(outline.rootNode()).click();
    outline.directoryOf(outline.rootNode()).should("contain.text", "new-directory-name");
  });

  it("does not show create directory toolbar button if artifact is selected", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.artifactOf(outline.rootNode()).first().click();
    toolbarNode.buttonCreateDirectory().should("not.exist");
  });
});
