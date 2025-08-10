import { openMemory } from "../macros";
import {
  editorDirectory,
  outlineNodesLegacy,
  toolbarNode
} from "../selectors";

describe("button-directory-open", () => {
  beforeEach(() => {
    openMemory();
  });

  it("can open directory via toolbar button", () => {
    outlineNodesLegacy.rootNode().click();
    toolbarNode.buttonOpenDirectory().click();
    editorDirectory.tipUnloaded().should("not.exist");
  });
});