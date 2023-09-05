import { useT } from "@lib";
import { useDeleteArtifact } from "@body";

export function useActions() {
  const t = useT();

  const editAction = { name: "edit", label: t("edit") };
  const archiveAction = { name: "archive", label: t("archive") };
  const unarchiveAction = { name: "unarchive", label: t("unarchive") };
  const deleteAction = { name: "delete", label: t("delete") };

  const solveActions = (artifact) => {
    return artifact.archivedAt
      ? [unarchiveAction, deleteAction]
      : [editAction, archiveAction, deleteAction];
  };

  const deleteTask = useDeleteArtifact();

  const solveTask = (action) => {
    switch (action) {
      case deleteAction.name:
        return deleteTask;
      default:
        () => console.log(action);
    }
  };

  return { solveActions, solveTask };
}
