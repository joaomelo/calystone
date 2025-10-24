import { openMemory } from "../macros";
import {
  editorPdf,
  outlineNodes,
} from "../selectors";

describe("editor-pdf", () => {
  beforeEach(() => {
    openMemory();
  });

  it("shows pdf viewer", () => {
    cy.get(outlineNodes.nodeToogle).first().click();
    cy.get(outlineNodes.nodeLabelWithExtension("pdf")).first().click();
    cy.get(editorPdf.page).should("exist");
  });
});