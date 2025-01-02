import { pageOpen, pageOutline } from "../helpers";

describe("outline", function() {
  this.beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("enables lazy directory navigation", function() {
    cy.url().should("include", pageOutline.url());
  });
});