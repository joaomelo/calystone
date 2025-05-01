import { frameDashboard, outline, pageOpen } from "../helpers";

describe("sidebar", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("reload", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.childrenOf(outlineNodes.rootNode()).should("have.length.greaterThan", 0);
    frameDashboard.selectors.reload().click();
    outlineNodes.childrenContainerOf(outlineNodes.rootNode()).should("not.exist");
  });

  it("exit", () => {
    frameDashboard.selectors.exit().click();
    cy.url().should("include", pageOpen.selectors.url());
  });
});
