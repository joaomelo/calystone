import { openMemory } from "../macros";
import { outlineNodesLegacy } from "../selectors";

describe("outline-folders", () => {
  beforeEach(() => {
    openMemory();
  });

  it("enables outline navigation", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.rootNode().should("have.attr", "aria-expanded", "true");

    outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).first().as("subdirectory");
    outlineNodesLegacy.toogleOf(cy.get("@subdirectory")).click();
    cy.get("@subdirectory").should("have.attr", "aria-expanded", "true");
  });

  it("can open directory via expand", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.childrenOf(outlineNodesLegacy.rootNode()).should("have.length.greaterThan", 0);
  });
});
