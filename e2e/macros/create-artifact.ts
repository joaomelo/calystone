import {
  modalCreateArtifact,
  toolbarNode
} from "../selectors";

export function createArtifact(name: string) {
  toolbarNode.buttonCreateArtifact().click();
  modalCreateArtifact.inputName().clear().type(name);
  modalCreateArtifact.buttonSave().click();
  modalCreateArtifact.buttonSave().should("not.exist");
}
