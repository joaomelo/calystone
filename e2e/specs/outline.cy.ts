import { editor, outline, pageOpen } from "../helpers";

describe("outline", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("enables outline navigation", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.rootNode().should("have.attr", "aria-expanded", "true");

    outline.directoryOf(outline.rootNode()).first().as("subdirectory");
    outline.toogleOf(cy.get("@subdirectory")).click();
    cy.get("@subdirectory").should("have.attr", "aria-expanded", "true");
  });

  it("shows summary data when binary artifact is selected", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.binaryArtifactOf(outline.rootNode()).first().click();
    editor.binary.type().should("exist");
    editor.binary.size().should("exist");
    editor.binary.path().should("exist");
  });

  it("shows content when text artifact is selected", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.textArtifactOf(outline.rootNode()).first().click();
    editor.text.editor().should("exist");
  });
});