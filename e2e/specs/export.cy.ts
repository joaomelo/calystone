import { outline, pageOpen, toolbarNode } from "../helpers";

declare global {
  interface Window {
    showSaveFilePicker: (options?: { suggestedName?: string }) => Promise<FileSystemFileHandle>;
  }
}

describe("export", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
    outline.toogleOf(outline.rootNode()).click();
  });

  it("allows text artifact export", () => {
    cy.window().then((win) => {
      const createWritableStub = {
        close: cy.stub().resolves(),
        write: cy.stub().resolves()
      };

      cy.stub(win, "showSaveFilePicker").resolves({
        createWritable: () => Promise.resolve(createWritableStub)
      });
    });

    outline.textArtifactOf(outline.rootNode()).first().as("artifact");
    cy.get("@artifact").click();
    toolbarNode.buttonExport().click();

    cy.window().then((win) => {
      cy.wrap(win.showSaveFilePicker).should("have.been.calledOnce");
    });
  });

  it("does not allow directory export", () => {
    outline.directoryOf(outline.rootNode()).first().as("directory");
    cy.get("@directory").click();
    toolbarNode.buttonExport().should("not.exist");
  });
});
