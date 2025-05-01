import { pageOpen, pageOutline } from "../helpers";

describe("open-source", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("opens memory outlineNodes", () => {
    cy.url().should("include", pageOutline.url());
  });
});
