import { openMemory } from "../macros";
import {
  pageFolders,
  pageOpen
} from "../selectors";

describe("button-exit", () => {
  beforeEach(() => {
    openMemory();
  });

  it("exit", () => {
    pageFolders.exit().click();
    cy.url().should("include", pageOpen.url());
  });
});
