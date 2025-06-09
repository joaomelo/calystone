import { dialogCreateDirectory, openMacros, outlineNodes, toolbarNode } from "../helpers";

describe("create-directory", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("creates directory inside another directory", () => {
    outlineNodes.rootNode().click();
    toolbarNode.buttonCreateDirectory().click();
    dialogCreateDirectory.inputName().clear().type("new-directory-name");
    dialogCreateDirectory.buttonSave().click();

    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.directoryOf(outlineNodes.rootNode()).should("contain.text", "new-directory-name");
  });

  it("does not show create directory toolbar button if artifact is selected", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.artifactOf(outlineNodes.rootNode()).first().click();
    toolbarNode.buttonCreateDirectory().should("not.exist");
  });
});
