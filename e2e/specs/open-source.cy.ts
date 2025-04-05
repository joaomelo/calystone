import { pageOpen, pageOutline } from "../helpers";

describe("open-source", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("opens memory outline", () => {
    cy.url().should("include", pageOutline.selectors.url());
  });
});
