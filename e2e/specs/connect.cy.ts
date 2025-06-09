import { openMacros, pageNodes } from "../helpers";

describe("connects", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("opens memory outlineNodes", () => {
    cy.url().should("include", pageNodes.url());
  });
});
