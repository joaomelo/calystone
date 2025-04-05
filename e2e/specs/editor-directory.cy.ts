import { editorDirectory, outline, pageOpen } from "../helpers";

describe("editor-directory", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
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