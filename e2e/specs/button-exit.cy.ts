import { openMemory } from "../macros";
import {
  pageNodes,
  pageOpen
} from "../selectors";

describe("button-exit", () => {
  beforeEach(() => {
    openMemory();
  });

  it("exit", () => {
    pageNodes.exit().click();
    cy.url().should("include", pageOpen.url());
  });
});
