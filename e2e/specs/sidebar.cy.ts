import { frameDashboard, pageOpen, pageOutline } from "../helpers";

describe("sidebar", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("reload", () => {
    pageOutline.selectors.tree.toogleOf(pageOutline.selectors.tree.rootNode()).click();
    pageOutline.selectors.tree.childrenOf(pageOutline.selectors.tree.rootNode()).should("have.length.greaterThan", 0);
    frameDashboard.selectors.reload().click();
    pageOutline.selectors.tree.childrenContainerOf(pageOutline.selectors.tree.rootNode()).should("not.exist");
  });

  it("exit", () => {
    frameDashboard.selectors.exit().click();
    cy.url().should("include", pageOpen.selectors.url());
  });
});
