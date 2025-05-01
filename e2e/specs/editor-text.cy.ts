import { editorText, outlineNodes, pageOpen } from "../helpers";

describe("editor-binary", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("shows content when text artifact is selected", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.artifactTextOf(outlineNodes.rootNode()).first().click();
    editorText.input().should("exist");
  });
});