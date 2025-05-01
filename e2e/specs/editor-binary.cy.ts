import { editorBinary, outline, pageOpen } from "../helpers";

describe("editor-binary", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("shows artifact binary data according to directory status", () => {
    outlineNodes.labelOf(outlineNodes.rootNode()).then(label => {
      outlineNodes.toogleOf(outlineNodes.rootNode()).click();
      outlineNodes.artifactBinaryOf(outlineNodes.rootNode()).first().click();

      editorBinary.typeLabel().should("exist");
      editorBinary.sizeLabel().should("exist");
      editorBinary.pathLabel().should("exist");
      editorBinary.pathValue().should("contain.text", `/${label}`);
      editorBinary.lastModifiedLabel().should("exist");
    });

  });
});