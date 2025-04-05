import { editorBinary, outline, pageOpen } from "../helpers";

describe("editor-binary", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("shows artifact binary data according to directory status", () => {
    outline.labelOf(outline.rootNode()).then(label => {
      outline.toogleOf(outline.rootNode()).click();
      outline.binaryArtifactOf(outline.rootNode()).first().click();

      editorBinary.typeLabel().should("exist");
      editorBinary.sizeLabel().should("exist");
      editorBinary.pathLabel().should("exist");
      editorBinary.pathValue().should("contain.text", `/${label}`);
      editorBinary.lastModifiedLabel().should("exist");
    });

  });
});