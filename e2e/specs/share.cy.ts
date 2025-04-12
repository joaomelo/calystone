import { outline, pageOpen, toolbarNode } from "../helpers";

describe("share", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
    outline.toogleOf(outline.rootNode()).click();
  });

  it("allows text artifact share", () => {
    cy.window().then((win) => {
      const stub = cy.stub(win.navigator, "share").resolves();
      cy.stub(win.navigator, "canShare").resolves(true);

      outline.textArtifactOf(outline.rootNode()).first().as("artifact");
      cy.get("@artifact").click();
      toolbarNode.buttonShare().click();

      cy.wrap(stub).should("have.been.calledOnce");
    });
  });

  it("does not allow directory share", () => {
    outline.directoryOf(outline.rootNode()).first().as("directory");
    cy.get("@directory").click();
    toolbarNode.buttonShare().should("not.exist");
  });
});
