import { outline, pageOpen, toolbarNode } from "../helpers";

describe("share", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
  });

  it("allows text artifact share", () => {
    cy.window().then((win) => {
      Object.defineProperty(win.navigator, "share", {
        value: () => Promise.resolve(),
        writable: true
      });
      Object.defineProperty(win.navigator, "canShare", {
        value: () => true,
        writable: true
      });

      const stub = cy.stub(win.navigator, "share").resolves();

      outlineNodes.artifactTextOf(outlineNodes.rootNode()).first().as("artifact");
      cy.get("@artifact").click();
      toolbarNode.buttonShare().click();
      cy.wrap(stub).should("have.been.calledOnce");
    });
  });

  it("does not allow directory share", () => {
    outlineNodes.directoryOf(outlineNodes.rootNode()).first().as("directory");
    cy.get("@directory").click();
    toolbarNode.buttonShare().should("not.exist");
  });
});
