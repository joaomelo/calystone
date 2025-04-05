import { editorDirectory, outline, pageOpen, toolbarNode } from "../helpers";

describe("outline", () => {
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

  it("shows and updates tip and directory data according to directory status", () => {
    outline.labelOf(outline.rootNode()).then(label => {
      outline.rootNode().click();
      editorDirectory.tipUnloaded().should("exist");
      editorDirectory.itemsValue().should("contain.text", "0");
      editorDirectory.pathValue().should("contain.text", `/${label}`);

      outline.toogleOf(outline.rootNode()).click();
      editorDirectory.tipUnloaded().should("not.exist");
      editorDirectory.itemsValue().should("not.contain.text", "0");
    });

  });
});