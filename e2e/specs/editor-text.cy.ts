import { editorText, outline, pageOpen } from "../helpers";

describe("editor-binary", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("shows content when text artifact is selected", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.textArtifactOf(outline.rootNode()).first().click();
    editorText.input().should("exist");
  });
});