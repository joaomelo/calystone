import { editorDirectory, openMacros, outlineNodes } from "../helpers";

describe("editor-directory", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("shows and updates tip and directory data according to directory status", () => {
    outlineNodes.labelOf(outlineNodes.rootNode()).then(label => {
      outlineNodes.rootNode().click();
      editorDirectory.tipUnloaded().should("exist");
      editorDirectory.itemsValue().should("have.text", "0");
      editorDirectory.pathValue().should("contain.text", `/${label}`);

      outlineNodes.toogleOf(outlineNodes.rootNode()).click();
      editorDirectory.tipUnloaded().should("not.exist");
      editorDirectory.itemsValue().should("not.have.text", "0");
    });
  });

  it("show descriptor content if it exists", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.rootNode().click();

    editorDirectory.descriptorTip().should("not.exist");
    editorDirectory.descriptorContent().should("not.be.empty");
  });

  it("show descriptor tip if it is not found", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
    outlineNodes.directoryOf(outlineNodes.rootNode()).eq(0).as("directory");

    cy.get("@directory").click();
    editorDirectory.descriptorTip().should("not.be.empty");

    outlineNodes.toogleOf(cy.get("@directory")).click();
    cy.get("@directory").click();
    editorDirectory.descriptorTip().should("not.be.empty");
  });
});