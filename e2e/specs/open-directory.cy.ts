import { editorDirectory, outline, pageOpen, toolbarNode } from "../helpers";

describe("open-directory", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("can open directory via expand", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.childrenOf(outline.rootNode()).should("have.length.greaterThan", 0);
  });

  it("can open directory via toolbar button", () => {
    outline.rootNode().click();
    toolbarNode.buttonOpenDirectory().click();
    editorDirectory.tipUnloaded().should("not.exist");
  });
});