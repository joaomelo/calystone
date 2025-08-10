import {
  createArtifact,
  openMemory
} from "../macros";
import {
  editorBinary,
  outlineNodesLegacy,
} from "../selectors";

describe("editor-binary", () => {
  beforeEach(() => {
    openMemory();
  });

  it("shows artifact binary data accordingly", () => {
    const artifactName = "new-artifact-name.exe";

    outlineNodesLegacy.rootNode().click();
    createArtifact(artifactName);
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();

    outlineNodesLegacy.labelOf(outlineNodesLegacy.rootNode()).then(label => {
      outlineNodesLegacy.nodeLabeledAs(artifactName).first().click();
      editorBinary.typeLabel().should("exist");
      editorBinary.sizeLabel().should("exist");
      editorBinary.pathLabel().should("exist");
      editorBinary.pathValue().should("contain.text", `/${label}/${artifactName}`);
      editorBinary.lastModifiedLabel().should("exist");
    });

  });
});