import {
  modalRenameArtifact,
  toolbarNode
} from "../selectors";

export function renameArtifact(newName?: string) {
  toolbarNode.buttonRename().click();

  modalRenameArtifact.inputName().clear();
  if (typeof newName === "string" && newName.length > 0) {
    modalRenameArtifact.inputName().type(newName);
  }

  modalRenameArtifact.buttonSave().click();
  modalRenameArtifact.buttonSave().should("not.exist");
}
