import { pageOpen, pageOutline } from "../helpers";

describe("outline", function() {
  this.beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("enables outline navigation", function() {
    pageOutline.selectors.toogleOf(pageOutline.selectors.rootNode()).click();
    pageOutline.selectors.rootNode().should("have.attr", "aria-expanded", "true");
    pageOutline.selectors.childrenOf(pageOutline.selectors.rootNode()).should("have.length.greaterThan", 0);

    pageOutline.selectors.subdirectoryOf(pageOutline.selectors.rootNode()).first().as("subdirectory");
    pageOutline.selectors.toogleOf(cy.get("@subdirectory")).click();
    cy.get("@subdirectory").should("have.attr", "aria-expanded", "true");
    pageOutline.selectors.childrenOf(cy.get("@subdirectory")).should("have.length.greaterThan", 0);
  });
});