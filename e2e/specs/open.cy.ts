import { pageOpen, pageOutline } from "../helpers";

describe("open", function() {
  it("opens memory outline", function() {
    pageOpen.macros.openMemory();
    cy.url().should("include", pageOutline.selectors.url());
  });
});
