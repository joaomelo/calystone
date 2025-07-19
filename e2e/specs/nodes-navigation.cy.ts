import {
  openMacros, outlineNodesLegacy
} from "../helpers";

describe("nodes-navigation", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("enables outlineNodesLegacy navigation", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.rootNode().should("have.attr", "aria-expanded", "true");

    outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).first().as("subdirectory");
    outlineNodesLegacy.toogleOf(cy.get("@subdirectory")).click();
    cy.get("@subdirectory").should("have.attr", "aria-expanded", "true");
  });

});