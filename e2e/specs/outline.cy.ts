import { outline, pageOpen } from "../helpers";

describe("outline", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("enables outline navigation", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.rootNode().should("have.attr", "aria-expanded", "true");

    outlineNodes.directoryOf(outlineNodes.rootNode()).first().as("subdirectory");
    outlineNodes.toogleOf(cy.get("@subdirectory")).click();
    cy.get("@subdirectory").should("have.attr", "aria-expanded", "true");
  });

});