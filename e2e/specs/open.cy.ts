import { frameDashboard, pageOpen, pageOutline } from "../helpers";

describe("open", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("opens memory outline", () => {
    cy.url().should("include", pageOutline.selectors.url());
  });

  it("returns to open page", () => {
    frameDashboard.selectors.exit().click();
    cy.url().should("include", pageOpen.selectors.url());
  });
});
