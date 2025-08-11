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