import {
  openMacros, pageNodes, pageOpen
} from "../helpers";

describe("exits", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("exit", () => {
    pageNodes.exit().click();
    cy.url().should("include", pageOpen.url());
  });
});
