import {
  openMacros, outlineNodes
} from "../helpers";

describe("nodes-navigation", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("enables outlineNodes navigation", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.rootNode().should("have.attr", "aria-expanded", "true");

    outlineNodes.directoryOf(outlineNodes.rootNode()).first().as("subdirectory");
    outlineNodes.toogleOf(cy.get("@subdirectory")).click();
    cy.get("@subdirectory").should("have.attr", "aria-expanded", "true");
  });

});