import { editorDirectory, outline, pageOpen } from "../helpers";

describe("editor-directory", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("shows and updates tip and directory data according to directory status", () => {
    outline.labelOf(outline.rootNode()).then(label => {
      outline.rootNode().click();
      editorDirectory.tipUnloaded().should("exist");
      editorDirectory.itemsValue().should("have.text", "0");
      editorDirectory.pathValue().should("contain.text", `/${label}`);

      outline.toogleOf(outline.rootNode()).click();
      editorDirectory.tipUnloaded().should("not.exist");
      editorDirectory.itemsValue().should("not.have.text", "0");
    });
  });

  it("show descriptor content if it exists", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.rootNode().click();

    editorDirectory.descriptorTip().should("not.exist");
    editorDirectory.descriptorContent().should("not.be.empty");
  });

  it("show descriptor tip if it is sure it does not exist", () => {
    outline.toogleOf(outline.rootNode()).click();
    outline.directoryOf(outline.rootNode()).eq(0).as("directory");

    cy.get("@directory").click();
    editorDirectory.descriptorTip().should("not.exist");

    outline.toogleOf(cy.get("@directory")).click();
    cy.get("@directory").click();
    editorDirectory.descriptorTip().should("not.be.empty");
  });
});