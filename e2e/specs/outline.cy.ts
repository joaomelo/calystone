import { outline, pageOpen } from "../helpers";

describe("outline", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("enables outline navigation", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.rootNode().should("have.attr", "aria-expanded", "true");

    outline.directoryOf(outline.rootNode()).first().as("subdirectory");
    outline.toogleOf(cy.get("@subdirectory")).click();
    cy.get("@subdirectory").should("have.attr", "aria-expanded", "true");
  });

});