import { useRouter } from "vue-router";
import { useDeleteArtifact } from "@body";
import { useT } from "@lib";

export function useActions() {
  const t = useT();

  const editAction = { name: "edit", label: t("edit") };
  const deleteAction = { name: "delete", label: t("delete") };

  const solveActions = (artifact) => {
    return artifact.archivedAt ? [deleteAction] : [editAction, deleteAction];
  };

  const deleteTask = useDeleteArtifact();

  const router = useRouter();
  const editArtifact = (artifact) => {
    router.push({
      name: "artifactEdit",
      params: { artifactId: artifact.id },
    });
  };

  const runAction = ({ action, item }) => {
    switch (action) {
      case deleteAction.name:
        return deleteTask.run(item);
      case editAction.name:
        return editArtifact(item);
    }
  };

  return { solveActions, runAction };
}
