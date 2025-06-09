import { openMacros, outlineNodes, pageNodes } from "../helpers";

describe("reload", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("reload", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.childrenOf(outlineNodes.rootNode()).should("have.length.greaterThan", 0);
    pageNodes.reload().click();
    outlineNodes.childrenContainerOf(outlineNodes.rootNode()).should("not.exist");
  });

});
