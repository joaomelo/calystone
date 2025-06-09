import { pageOpen } from "../helpers";

describe("locale", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("switches between locales", () => {
    pageOpen.locale.option("en").click();
    pageOpen.locale.label().should("have.text", "language");

    pageOpen.locale.option("pt-br").click();
    pageOpen.locale.label().should("have.text", "idioma");
  });
});
