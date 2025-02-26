import { pageOpen, pageOutline } from "../helpers";

describe("open", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("opens memory outline", () => {
    cy.url().should("include", pageOutline.selectors.url());
  });
});
