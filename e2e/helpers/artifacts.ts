import { dialogCreateArtifact } from "./dialog-create-artifact";
import { toolbarNode } from "./toolbar-node";

export function createArtifact(name: string) {
  toolbarNode.buttonCreateArtifact().click();
  dialogCreateArtifact.inputName().clear().type(name);
  dialogCreateArtifact.buttonSave().click();
  dialogCreateArtifact.buttonSave().should("not.exist");
}
