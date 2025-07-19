import {
  dataTest, editorEmpty, openMacros, outlineNodesLegacy, toolbarNode
} from "../helpers";

describe("remove", () => {
  beforeEach(() => {
    openMacros.openMemory();
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
  });

  const selectors = {
    buttonCancel: () => cy.get(dataTest("modal-remove-cancel")),
    buttonConfirm: () => cy.get(dataTest("modal-remove-confirm")),
  } as const;

  it("allows directory remove", () => {
    outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).first().as("directory");
    outlineNodesLegacy.labelOf(cy.get("@directory")).then((oldLabel) => {
      cy.get("@directory").click();
      toolbarNode.buttonRemove().click();
      selectors.buttonConfirm().click();

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
      selectors.buttonConfirm().click();

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
      selectors.buttonCancel().click();

      outlineNodesLegacy.labelOf(outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first())
        .then((newLabel) => {
          expect(newLabel).to.equal(oldLabel);
        });
    });
  });
});
