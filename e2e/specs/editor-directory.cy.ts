import { openMemory } from "../macros";
import {
  editorDirectory,
  outlineNodesLegacy
} from "../selectors";

describe("editor-directory", () => {
  beforeEach(() => {
    openMemory();
  });

  it("shows and updates tip and directory data according to directory status", () => {
    outlineNodesLegacy.labelOf(outlineNodesLegacy.rootNode()).then(label => {
      outlineNodesLegacy.rootNode().click();
      editorDirectory.tipUnloaded().should("exist");
      editorDirectory.itemsValue().should("have.text", "0");
      editorDirectory.pathValue().should("contain.text", `/${label}`);

      outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
      editorDirectory.tipUnloaded().should("not.exist");
      editorDirectory.itemsValue().should("not.have.text", "0");
    });
  });

  it("show descriptor content if it exists", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.rootNode().click();

    editorDirectory.descriptorTip().should("not.exist");
    editorDirectory.descriptorContent().should("not.be.empty");
  });

  it("show descriptor tip if it is not found", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).eq(0).as("directory");

    cy.get("@directory").click();
    editorDirectory.descriptorTip().should("not.be.empty");

    outlineNodesLegacy.toogleOf(cy.get("@directory")).click();
    cy.get("@directory").click();
    editorDirectory.descriptorTip().should("not.be.empty");
  });
});