import {
  createDirectory,
  openMemory
} from "../macros";
import {
  modalCreateDirectory,
  outlineNodes,
  outlineNodesLegacy,
  toolbarNode
} from "../selectors";

describe("create-directory", () => {
  beforeEach(() => {
    openMemory();
  });

  it("creates directory inside another directory", () => {
    cy.get(outlineNodes.nodeToogle).first().click();
    cy.get(outlineNodes.nodeInline).first().click();

    const directoryName = "new-directory-name";
    createDirectory(directoryName);

    outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).should("contain.text", directoryName);
  });

  it("forbids creating directory with the same name as existing directory", () => {
    const name = "duplicate-directory";

    cy.get(outlineNodes.nodeToogle).first().click();
    cy.get(outlineNodes.nodeInline).first().click();

    createDirectory(name);

    toolbarNode.buttonCreateDirectory().click();
    modalCreateDirectory.inputName().clear().type(name);
    modalCreateDirectory.buttonSave().click();

    modalCreateDirectory.modalError().should("exist");
  });
});
