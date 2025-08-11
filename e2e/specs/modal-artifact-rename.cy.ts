import { openMemory } from "../macros";
import {
  modalRenameArtifact,
  outlineNodesLegacy,
  toolbarNode
} from "../selectors";

describe("rename", () => {
  beforeEach(() => {
    openMemory();
  });

  it("allows new name for artifacts", () => {
    const newName = "_new-artifact-name";
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first().click();
    toolbarNode.buttonRename().click();
    modalRenameArtifact.inputName().clear().type(newName);
    modalRenameArtifact.buttonSave().click();
    outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first().should("contain.text", newName);
  });

  it("fails if name is empty", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first().click();

    toolbarNode.buttonRename().click();
    modalRenameArtifact.inputName().clear();
    modalRenameArtifact.buttonSave().click();
    modalRenameArtifact.inputError().should("exist");
  });

  it("show backend errors", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first().click();
    toolbarNode.buttonRename().click();
    modalRenameArtifact.inputName().clear().type("/\\|");
    modalRenameArtifact.buttonSave().click();
    modalRenameArtifact.modalError().should("exist");
  });
});
