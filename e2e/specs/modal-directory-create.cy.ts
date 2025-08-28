import {
  createDirectory,
  openMemory
} from "../macros";
import { outlineNodesLegacy } from "../selectors";

describe("create-directory", () => {
  beforeEach(() => {
    openMemory();
  });

  it("creates directory inside another directory", () => {
    outlineNodesLegacy.rootNode().click();

    const directoryName = "new-directory-name";
    createDirectory(directoryName);

    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).should("contain.text", directoryName);
  });
});
