import { openMemory } from "../macros";
import {
  editorEmpty,
  modalRemove,
  outlineNodesLegacy,
  toolbarNode
} from "../selectors";

describe("button-remove", () => {
  beforeEach(() => {
    openMemory();
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
  });

  it("allows directory remove", () => {
    outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).first().as("directory");
    outlineNodesLegacy.labelOf(cy.get("@directory")).then((oldLabel) => {
      cy.get("@directory").click();
      toolbarNode.buttonRemove().click();
      modalRemove.buttonConfirm().click();

      outlineNodesLegacy.labelOf(outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).first())
        .should((newLabel) => {
          expect(newLabel).to.not.equal(oldLabel);
        });
      editorEmpty.message().should("exist");
    });
  });

  it("allows artifact remove", () => {
    outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first().as("artifact");
    outlineNodesLegacy.labelOf(cy.get("@artifact")).then((oldLabel) => {
      cy.get("@artifact").click();
      toolbarNode.buttonRemove().click();
      modalRemove.buttonConfirm().click();

      outlineNodesLegacy.labelOf(outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first())
        .should((newLabel) => {
          expect(newLabel).to.not.equal(oldLabel);
        });
      editorEmpty.message().should("exist");
    });
  });

  it("does not remove if user cancels", () => {
    outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first().as("artifact");
    outlineNodesLegacy.labelOf(cy.get("@artifact")).then((oldLabel) => {
      cy.get("@artifact").click();
      toolbarNode.buttonRemove().click();
      modalRemove.buttonCancel().click();

      outlineNodesLegacy.labelOf(outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first())
        .then((newLabel) => {
          expect(newLabel).to.equal(oldLabel);
        });
    });
  });
});
