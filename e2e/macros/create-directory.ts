import {
  modalCreateArtifact,
  toolbarNode
} from "../selectors";

export function createDirectory(name: string) {
  toolbarNode.buttonCreateDirectory().click();
  modalCreateArtifact.inputName().clear().type(name);
  modalCreateArtifact.buttonSave().click();
  modalCreateArtifact.buttonSave().should("not.exist");
}
