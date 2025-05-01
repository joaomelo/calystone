import { outlineNodes, pageOpen, pageOutline } from "../helpers";

describe("data", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("reload", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.childrenOf(outlineNodes.rootNode()).should("have.length.greaterThan", 0);
    pageOutline.reload().click();
    outlineNodes.childrenContainerOf(outlineNodes.rootNode()).should("not.exist");
  });

  it("exit", () => {
    pageOutline.exit().click();
    cy.url().should("include", pageOpen.selectors.url());
  });
});
