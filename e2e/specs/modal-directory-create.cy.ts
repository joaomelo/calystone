import { openMemory } from "../macros";
import {
  modalCreateDirectory,
  outlineNodesLegacy,
  toolbarNode
} from "../selectors";

describe("create-directory", () => {
  beforeEach(() => {
    openMemory();
  });

  it("creates directory inside another directory", () => {
    outlineNodesLegacy.rootNode().click();
    toolbarNode.buttonCreateDirectory().click();
    modalCreateDirectory.inputName().clear().type("new-directory-name");
    modalCreateDirectory.buttonSave().click();

    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).should("contain.text", "new-directory-name");
  });
});
