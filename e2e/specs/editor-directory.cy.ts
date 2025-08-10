import { openMemory } from "../macros";
import {
  editorDirectory,
  outlineNodes,
  outlineNodesLegacy
} from "../selectors";

describe("editor-directory", () => {
  beforeEach(() => {
    openMemory();
  });

  it("shows and updates tip and directory data according to directory status", () => {
    outlineNodesLegacy.labelOf(outlineNodesLegacy.rootNode()).then(label => {
      outlineNodesLegacy.rootNode().click();
      editorDirectory.tipUnloaded().should("exist");
      editorDirectory.itemsValue().should("have.text", "0");
      editorDirectory.pathValue().should("contain.text", `/${label}`);

      outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
      editorDirectory.tipUnloaded().should("not.exist");
      editorDirectory.itemsValue().should("not.have.text", "0");
    });
  });

  it("show descriptor content if it exists", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.rootNode().click();

    editorDirectory.descriptorTip().should("not.exist");
    editorDirectory.descriptorContent().should("not.be.empty");
  });

  it("show descriptor tip if it is not found", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).eq(0).as("directory");

    cy.get("@directory").click();
    editorDirectory.descriptorTip().should("not.be.empty");

    outlineNodesLegacy.toogleOf(cy.get("@directory")).click();
    cy.get("@directory").click();
    editorDirectory.descriptorTip().should("not.be.empty");
  });

  it("does not show reload button if directory is not loaded", () => {
    outlineNodesLegacy.rootNode().click();
    editorDirectory.buttonReload().should("not.exist");
  });

  it("reloads directory", () => {
    cy.get(outlineNodes.rootTree)
      .find(outlineNodes.nodeToogle)
      .click();

    cy.get(outlineNodes.rootTree)
      .find(outlineNodes.directoryTree)
      .first()
      .find(outlineNodes.nodeToogle)
      .click();

    cy.get(outlineNodes.rootTree)
      .find(outlineNodes.directoryTree)
      .first()
      .find(outlineNodes.nodeChildren)
      .find(outlineNodes.nodeInline)
      .then($children => {
        const initialTexts = $children.map((i, el) => Cypress.$(el).text()).get();

        cy.get(outlineNodes.rootTree)
          .find(outlineNodes.directoryTree)
          .first()
          .find(outlineNodes.nodeInline)
          .first()
          .click();

        editorDirectory.buttonReload().click();

        cy.get(outlineNodes.rootTree)
          .find(outlineNodes.directoryTree)
          .first()
          .find(outlineNodes.nodeChildren)
          .find(outlineNodes.nodeInline)
          .then($children => {
            const newTexts = $children.map((i, el) => Cypress.$(el).text()).get();
            expect(newTexts).not.to.deep.equal(initialTexts);
          });
      });
  });
});