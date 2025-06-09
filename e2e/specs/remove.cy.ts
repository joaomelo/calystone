import { dataTest, editorEmpty, openMacros, outlineNodes, toolbarNode } from "../helpers";

describe("remove", () => {
  beforeEach(() => {
    openMacros.openMemory();
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
  });

  const selectors = {
    buttonCancel: () => cy.get(dataTest("modal-remove-cancel")),
    buttonConfirm: () => cy.get(dataTest("modal-remove-confirm")),
  } as const;

  it("allows directory remove", () => {
    outlineNodes.directoryOf(outlineNodes.rootNode()).first().as("directory");
    outlineNodes.labelOf(cy.get("@directory")).then((oldLabel) => {
      cy.get("@directory").click();
      toolbarNode.buttonRemove().click();
      selectors.buttonConfirm().click();

      outlineNodes.labelOf(outlineNodes.directoryOf(outlineNodes.rootNode()).first())
        .should((newLabel) => {
          expect(newLabel).to.not.equal(oldLabel);
        });
      editorEmpty.message().should("exist");
    });
  });

  it("allows artifact remove", () => {
    outlineNodes.artifactOf(outlineNodes.rootNode()).first().as("artifact");
    outlineNodes.labelOf(cy.get("@artifact")).then((oldLabel) => {
      cy.get("@artifact").click();
      toolbarNode.buttonRemove().click();
      selectors.buttonConfirm().click();

      outlineNodes.labelOf(outlineNodes.artifactOf(outlineNodes.rootNode()).first())
        .should((newLabel) => {
          expect(newLabel).to.not.equal(oldLabel);
        });
      editorEmpty.message().should("exist");
    });
  });

  it("does not remove if user cancels", () => {
    outlineNodes.artifactOf(outlineNodes.rootNode()).first().as("artifact");
    outlineNodes.labelOf(cy.get("@artifact")).then((oldLabel) => {
      cy.get("@artifact").click();
      toolbarNode.buttonRemove().click();
      selectors.buttonCancel().click();

      outlineNodes.labelOf(outlineNodes.artifactOf(outlineNodes.rootNode()).first())
        .then((newLabel) => {
          expect(newLabel).to.equal(oldLabel);
        });
    });
  });
});
