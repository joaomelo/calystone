import { frameDashboard, pageOpen, pageOutline } from "../helpers";

describe("sidebar", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("reload", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.childrenOf(outline.rootNode()).should("have.length.greaterThan", 0);
    frameDashboard.selectors.reload().click();
    outline.childrenContainerOf(outline.rootNode()).should("not.exist");
  });

  it("exit", () => {
    frameDashboard.selectors.exit().click();
    cy.url().should("include", pageOpen.selectors.url());
  });
});
