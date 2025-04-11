import { outline, pageOpen, toolbarNode } from "../helpers";

describe("share", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
    outline.toogleOf(outline.rootNode()).click();
  });

  it("allows text artifact share", () => {
    outline.textArtifactOf(outline.rootNode()).first().as("artifact");
    cy.get("@artifact").click();
    toolbarNode.buttonShare().should("exist");
  });

  it("does not allow directory share", () => {
    outline.directoryOf(outline.rootNode()).first().as("directory");
    cy.get("@directory").click();
    toolbarNode.buttonShare().should("not.exist");
  });
});
