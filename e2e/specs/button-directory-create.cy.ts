import { openMemory } from "../macros";
import {
  outlineNodesLegacy,
  toolbarNode
} from "../selectors";

describe("create-directory", () => {
  beforeEach(() => {
    openMemory();
  });

  it("does not show create directory toolbar button if artifact is selected", () => {
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
    outlineNodesLegacy.artifactOf(outlineNodesLegacy.rootNode()).first().click();
    toolbarNode.buttonCreateDirectory().should("not.exist");
  });
});
