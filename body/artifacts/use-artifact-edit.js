import { useTask } from "@shared";
import { useService } from "@service";
import { createIsId } from "./selectors";
import { useArtifact } from "./use-artifact";

export function useArtifactEdit(id) {
  const service = useService();
  const artifact = useArtifact(createIsId(id));
  const { task } = useTask(async (payload) => {
    await service.db.edit("artifacts", payload);
  });
  return { artifact, task };
}
