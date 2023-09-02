import { reactive } from "vue";
import { AppError, useService, useTask } from "@lib";

export function useAddArtifact() {
  const [auth, artifacts] = useService(["auth", "artifacts"]);
  const artifactData = reactive({
    name: null,
    parentId: null,
  });

  const addArtifactTask = useTask(() =>
    addArtifact({ artifactData, auth, artifacts })
  );

  return [addArtifactTask, artifactData];
}

function addArtifact({ artifactData, auth, artifacts }) {
  const { name, parentId } = artifactData;

  if (!name) throw new AppError({ code: "ARTIFACTS_ERRORS.NO_REQUIRED_NAME" });

  const usersIds = parentId ? null : [auth.user.id];
  const archivedAt = null;

  return artifacts.add({ name, parentId, usersIds, archivedAt });
}
