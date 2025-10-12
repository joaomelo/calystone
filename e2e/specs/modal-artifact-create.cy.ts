import {
  createArtifact,
  openMemory
} from "../macros";
import {
  modalCreateArtifact,
  outlineNodes,
  outlineNodesLegacy,
  toolbarNode
} from "../selectors";

describe("modal-create-artifact", () => {
  beforeEach(() => {
    openMemory();
  });

  it("creates file", () => {
    const textArtifactName = "sibling.txt";

    cy.get(outlineNodes.nodeToogle).first().click();
    cy.get(outlineNodes.rootTree).click();

    createArtifact(textArtifactName);

    outlineNodesLegacy.nodeLabeledAs(textArtifactName).first().should("exist");
  });

  it("forbids creating artifact with the same name as existing artifact", () => {
    const artifactName = "artifact.txt";

    cy.get(outlineNodes.nodeToogle).first().click();
    cy.get(outlineNodes.rootTree).click();

    createArtifact(artifactName);

    toolbarNode.buttonCreateArtifact().click();
    modalCreateArtifact.inputName().clear().type(artifactName);
    modalCreateArtifact.buttonSave().click();

    modalCreateArtifact.modalError().should("exist");
  });
});