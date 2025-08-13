import { openMemory } from "../macros";
import {
  editorDirectory,
  outlineNodes,
  toolbarNode
} from "../selectors";

describe("button-directory-open", () => {
  beforeEach(() => {
    openMemory();
  });

  it("can open directory via toolbar button", () => {
    cy.get(outlineNodes.nodeInline).first().click();
    toolbarNode.buttonOpenDirectory().click();
    editorDirectory.tipUnloaded().should("not.exist");
  });
});