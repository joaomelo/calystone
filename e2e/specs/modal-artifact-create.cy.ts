import { openMemory } from "../macros";
import {
  modalCreateArtifact,
  outlineNodesLegacy,
  toolbarNode
} from "../selectors";

describe("modal-create-artifact", () => {
  beforeEach(() => {
    openMemory();
  });

  it("creates file", () => {
    const textArtifactName = "sibling.txt";

    outlineNodesLegacy.rootNode().click();
    toolbarNode.buttonCreateArtifact().click();
    modalCreateArtifact.inputName().clear().type(textArtifactName);
    modalCreateArtifact.buttonSave().click();

    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactTextOf(outlineNodesLegacy.rootNode()).should("contain.text", textArtifactName);

    outlineNodesLegacy.nodeLabeledAs(textArtifactName).first().should("exist");
  });
});