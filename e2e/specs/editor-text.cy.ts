import {
  createArtifact,
  openMemory
} from "../macros";
import {
  editorText,
  outlineNodesLegacy,
} from "../selectors";

describe("editor-text", () => {
  beforeEach(() => {
    openMemory();
  });

  it("shows text editor", () => {
    const textArtifactName = "sibling.txt";

    outlineNodesLegacy.rootNode().click();
    createArtifact(textArtifactName);

    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactTextOf(outlineNodesLegacy.rootNode()).should("contain.text", textArtifactName);

    outlineNodesLegacy.nodeLabeledAs(textArtifactName).first().click();
    editorText.input().should("exist");
  });
});