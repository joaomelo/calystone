import {
  editorDirectory,
  openMacros,
  outlineNodesLegacy,
  toolbarNode
} from "../helpers";

describe("open-directory", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("can open directory via expand", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.childrenOf(outlineNodesLegacy.rootNode()).should("have.length.greaterThan", 0);
  });

  it("can open directory via toolbar button", () => {
    outlineNodesLegacy.rootNode().click();
    toolbarNode.buttonOpenDirectory().click();
    editorDirectory.tipUnloaded().should("not.exist");
  });
});