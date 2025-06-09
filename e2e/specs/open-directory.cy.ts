import { editorDirectory, openMacros, outlineNodes, toolbarNode } from "../helpers";

describe("open-directory", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("can open directory via expand", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.childrenOf(outlineNodes.rootNode()).should("have.length.greaterThan", 0);
  });

  it("can open directory via toolbar button", () => {
    outlineNodes.rootNode().click();
    toolbarNode.buttonOpenDirectory().click();
    editorDirectory.tipUnloaded().should("not.exist");
  });
});