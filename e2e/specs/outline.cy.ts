import { pageOpen, pageOutline } from "../helpers";

describe("outline", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("enables outline navigation", () => {
    pageOutline.selectors.tree.toogleOf(pageOutline.selectors.tree.rootNode()).click();
    pageOutline.selectors.tree.rootNode().should("have.attr", "aria-expanded", "true");
    pageOutline.selectors.tree.childrenOf(pageOutline.selectors.tree.rootNode()).should("have.length.greaterThan", 0);

    pageOutline.selectors.tree.directoryOf(pageOutline.selectors.tree.rootNode()).first().as("subdirectory");
    pageOutline.selectors.tree.toogleOf(cy.get("@subdirectory")).click();
    cy.get("@subdirectory").should("have.attr", "aria-expanded", "true");
    pageOutline.selectors.tree.childrenOf(cy.get("@subdirectory")).should("have.length.greaterThan", 0);
  });

  it("shows directory data when selected", () => {
    pageOutline.selectors.tree.rootNode().click();
    pageOutline.selectors.editors.directory.items().should("exist");
    pageOutline.selectors.editors.directory.path().should("exist");
  });

  it("shows summary data when binary artifact is selected", () => {
    pageOutline.selectors.tree.toogleOf(pageOutline.selectors.tree.rootNode()).click();
    pageOutline.selectors.tree.binaryArtifactOf(pageOutline.selectors.tree.rootNode()).first().click();
    pageOutline.selectors.editors.binary.type().should("exist");
    pageOutline.selectors.editors.binary.size().should("exist");
    pageOutline.selectors.editors.binary.path().should("exist");
  });

  it("shows content when text artifact is selected", () => {
    pageOutline.selectors.tree.toogleOf(pageOutline.selectors.tree.rootNode()).click();
    pageOutline.selectors.tree.textArtifactOf(pageOutline.selectors.tree.rootNode()).first().click();
    pageOutline.selectors.editors.text.editor().should("exist");
  });
});