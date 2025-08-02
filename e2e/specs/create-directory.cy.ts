import {
  dialogCreateDirectory,
  openMacros,
  outlineNodesLegacy,
  toolbarNode
} from "../helpers";

describe("create-directory", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("creates directory inside another directory", () => {
    outlineNodesLegacy.rootNode().click();
    toolbarNode.buttonCreateDirectory().click();
    dialogCreateDirectory.inputName().clear().type("new-directory-name");
    dialogCreateDirectory.buttonSave().click();

    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).should("contain.text", "new-directory-name");
  });

  it("does not show create directory toolbar button if artifact is selected", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first().click();
    toolbarNode.buttonCreateDirectory().should("not.exist");
  });
});
